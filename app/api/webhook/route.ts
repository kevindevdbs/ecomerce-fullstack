import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import prisma from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";

// Webhook para receber notificações do Mercado Pago
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("📢 Notificação do Mercado Pago recebida:", body);

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

      // Atualizar ou criar pedido no banco
      await prisma.order.upsert({
        where: { paymentId: String(paymentId) },
        update: {
          status: paymentInfo.status || "pending",
          customerEmail: paymentInfo.payer?.email || null,
          customerName:
            `${paymentInfo.payer?.first_name || ""} ${paymentInfo.payer?.last_name || ""}`.trim() ||
            null,
          customerPhone: paymentInfo.payer?.phone?.number || null,
          paymentMethod: paymentInfo.payment_method_id || null,
          updatedAt: new Date(),
        },
        create: {
          paymentId: String(paymentId),
          status: paymentInfo.status || "pending",
          items: paymentInfo.additional_info?.items || [],
          total: paymentInfo.transaction_amount || 0,
          customerEmail: paymentInfo.payer?.email || null,
          customerName:
            `${paymentInfo.payer?.first_name || ""} ${paymentInfo.payer?.last_name || ""}`.trim() ||
            null,
          customerPhone: paymentInfo.payer?.phone?.number || null,
          paymentMethod: paymentInfo.payment_method_id || null,
        },
      });

      console.log(`✅ Pedido atualizado/criado para pagamento ${paymentId}`);

      // Enviar email de confirmação se aprovado
      if (paymentInfo.status === "approved") {
        const order = await prisma.order.findUnique({
          where: { paymentId: String(paymentId) },
        });

        if (order && order.customerEmail && order.customerName) {
          console.log(
            `📧 Enviando email de confirmação para ${order.customerEmail}`,
          );
          await sendOrderConfirmation({
            id: order.id,
            total: order.total,
            customerEmail: order.customerEmail,
            customerName: order.customerName,
            items: Array.isArray(order.items) ? order.items : [],
          });
        }
      }
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
