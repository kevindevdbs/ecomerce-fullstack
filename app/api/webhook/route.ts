import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Webhook para receber notificações do Mercado Pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=".repeat(60));
    console.log("📢 WEBHOOK RECEBIDO!");
    console.log("Body completo:", JSON.stringify(body, null, 2));
    console.log("=".repeat(60));

    // Validar se as credenciais estão configuradas
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    console.log("🔑 Token existe?", !!token);

    if (!token || token === "COLE_SEU_TOKEN_DE_PRODUCAO_AQUI") {
      console.error("❌ MERCADOPAGO_ACCESS_TOKEN não configurado!");
      return NextResponse.json(
        { error: "Credenciais não configuradas" },
        { status: 500 },
      );
    }

    const { type, data, action } = body;
    console.log(`📦 Type: ${type}, Action: ${action}, Payment ID: ${data?.id}`);

    if (type === "payment") {
      const paymentId = data.id;

      console.log(`💰 Processando pagamento ${paymentId}`);

      try {
        // Buscar detalhes do pagamento
        const client = new MercadoPagoConfig({
          accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
        });
        const payment = new Payment(client);
        const paymentInfo = await payment.get({ id: paymentId });

        console.log(`📊 Status do pagamento: ${paymentInfo.status}`);
        console.log(
          `📋 Dados COMPLETOS do pagamento:`,
          JSON.stringify(paymentInfo, null, 2),
        );

        // Log específico dos dados do cliente
        console.log("👤 DADOS DO CLIENTE RECEBIDOS:");
        console.log("  - Email:", paymentInfo.payer?.email);
        console.log("  - First Name:", paymentInfo.payer?.first_name);
        console.log("  - Last Name:", paymentInfo.payer?.last_name);
        console.log("  - Telefone:", paymentInfo.payer?.phone?.number);
        console.log("  - Tipo de identificação:", paymentInfo.payer?.identification?.type);
        console.log("  - Número de identificação:", paymentInfo.payer?.identification?.number);

        // Buscar pedido existente por diferentes identificadores
        const externalReference = paymentInfo.external_reference;

        console.log(`🔍 Procurando pedido com:`, {
          paymentId,
          externalReference,
          preferenceId: paymentInfo.metadata?.preference_id,
        });

        // Tentar encontrar o pedido existente
        let existingOrder = await prisma.order.findUnique({
          where: { paymentId: String(paymentId) },
        });

        // Se não encontrar por paymentId, tentar por externalReference
        if (!existingOrder && externalReference) {
          existingOrder = await prisma.order.findFirst({
            where: { externalReference: externalReference },
          });
        }

        console.log(
          `🔍 Pedido encontrado: ${existingOrder ? existingOrder.id : "Nenhum"}`,
        );

        // Atualizar ou criar pedido no banco
        const firstName = paymentInfo.payer?.first_name || "";
        const lastName = paymentInfo.payer?.last_name || "";
        const fullName = `${firstName} ${lastName}`.trim();
        
        // Se não tiver nome, usar identificação (CPF/CNPJ)
        const customerName = fullName || 
          (paymentInfo.payer?.identification?.number 
            ? `Cliente CPF ${paymentInfo.payer.identification.number}`
            : null);

        console.log("✅ Nome processado:", customerName);

        const orderData = {
          paymentId: String(paymentId),
          externalReference: externalReference || undefined,
          status: paymentInfo.status || "pending",
          items: (paymentInfo.additional_info?.items ||
            []) as Prisma.InputJsonValue,
          total: paymentInfo.transaction_amount || 0,
          customerEmail: paymentInfo.payer?.email || null,
          customerName: customerName,
          customerPhone: paymentInfo.payer?.phone?.number || null,
          paymentMethod: paymentInfo.payment_method_id || null,
          updatedAt: new Date(),
        };

        let order;
        if (existingOrder) {
          // Atualizar pedido existente
          order = await prisma.order.update({
            where: { id: existingOrder.id },
            data: orderData,
          });
          console.log(`✅ Pedido ${order.id} atualizado`);
        } else {
          // Criar novo pedido
          order = await prisma.order.create({
            data: orderData,
          });
          console.log(`✅ Novo pedido ${order.id} criado`);
        }
      } catch (paymentError) {
        console.error("❌ Erro ao buscar/processar pagamento:");
        console.error("Erro completo:", JSON.stringify(paymentError, null, 2));
        console.error("Tipo do erro:", typeof paymentError);
        console.error("Erro string:", String(paymentError));

        // Se for um erro do Mercado Pago, extrair mais informações
        if (paymentError && typeof paymentError === "object") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorObj = paymentError as any;
          console.error("Status:", errorObj.status);
          console.error("Message:", errorObj.message);
          console.error("Cause:", JSON.stringify(errorObj.cause, null, 2));
        }

        // Retornar sucesso mesmo com erro para não bloquear o webhook
        console.log("⚠️ Ignorando erro e retornando sucesso para não retentar");
        return NextResponse.json(
          {
            success: true,
            warning: "Erro ao processar pagamento",
            error: String(paymentError),
          },
          { status: 200 },
        );
      }
    }

    console.log("✅ Webhook processado com sucesso!");
    console.log("=".repeat(60));
    return NextResponse.json(
      { success: true, received: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("=".repeat(60));
    console.error("❌ ERRO GERAL NO WEBHOOK:");
    console.error("Tipo:", typeof error);
    console.error("String:", String(error));
    console.error(
      "JSON:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    );
    console.error(
      "Mensagem:",
      error instanceof Error ? error.message : String(error),
    );
    console.error("Stack:", error instanceof Error ? error.stack : "N/A");
    console.error("=".repeat(60));
    return NextResponse.json(
      {
        error: "Erro ao processar notificação",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// Método GET para validação do endpoint (Mercado Pago testa o webhook)
export async function GET() {
  console.log("✅ GET request no webhook - Mercado Pago validando endpoint");
  return NextResponse.json(
    { status: "ok", webhook: "active" },
    { status: 200 },
  );
}
