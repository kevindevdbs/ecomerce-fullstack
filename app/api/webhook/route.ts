import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import prisma from "@/lib/prisma";
import { OrderItem } from "@/types";
import { Prisma } from "@prisma/client";

// Webhook para receber notificações do Mercado Pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(
      "📢 Notificação do Mercado Pago recebida:",
      JSON.stringify(body, null, 2),
    );

    const { type, data } = body;

    if (type === "payment") {
      const paymentId = data.id;

      console.log(`💰 Processando pagamento ${paymentId}`);

      // Buscar detalhes do pagamento
      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
      });
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: paymentId });

      console.log(`📊 Status do pagamento: ${paymentInfo.status}`);
      console.log(`📋 Dados do pagador:`, {
        email: paymentInfo.payer?.email,
        first_name: paymentInfo.payer?.first_name,
        last_name: paymentInfo.payer?.last_name,
        phone: paymentInfo.payer?.phone?.number,
      });

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
      const orderData = {
        paymentId: String(paymentId),
        externalReference: externalReference || undefined,
        status: paymentInfo.status || "pending",
        items: (paymentInfo.additional_info?.items ||
          []) as Prisma.InputJsonValue,
        total: paymentInfo.transaction_amount || 0,
        customerEmail: paymentInfo.payer?.email || null,
        customerName:
          `${paymentInfo.payer?.first_name || ""} ${paymentInfo.payer?.last_name || ""}`.trim() ||
          null,
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

      // Enviar email de confirmação se aprovado (DESABILITADO - Requer domínio próprio)
      // if (paymentInfo.status === "approved") {
      //   if (order && order.customerEmail && order.customerName) {
      //     console.log(
      //       `📧 Enviando email de confirmação para ${order.customerEmail}`,
      //     );
      //     await sendOrderConfirmation({
      //       id: order.id,
      //       total: order.total,
      //       customerEmail: order.customerEmail,
      //       customerName: order.customerName,
      //       items: (Array.isArray(order.items)
      //         ? order.items
      //         : []) as unknown as OrderItem[],
      //     });
      //   }
      // }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
    return NextResponse.json(
      { error: "Erro ao processar notificação" },
      { status: 500 },
    );
  }
}

// Método GET para validação do endpoint (Mercado Pago testa o webhook)
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
