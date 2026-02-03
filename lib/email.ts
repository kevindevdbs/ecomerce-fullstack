import { Resend } from "resend";
import { OrderItem } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: {
  id: string;
  total: number;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: [order.customerEmail],
      subject: `✅ Pedido Confirmado #${order.id.substring(0, 8)}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
                color: white;
                padding: 30px;
                border-radius: 12px 12px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
              }
              .content {
                background: #fff;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .order-info {
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .item {
                padding: 15px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .item:last-child {
                border-bottom: none;
              }
              .total {
                background: #ecfdf5;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: center;
              }
              .total-amount {
                font-size: 32px;
                font-weight: bold;
                color: #059669;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎉 Pedido Confirmado!</h1>
              <p style="margin: 5px 0 0 0; font-size: 16px;">Seu pagamento foi aprovado com sucesso</p>
            </div>
            
            <div class="content">
              <p>Olá <strong>${order.customerName}</strong>,</p>
              
              <p>Seu pedido foi confirmado e já está sendo processado! Obrigado por comprar conosco.</p>
              
              <div class="order-info">
                <p style="margin: 0 0 10px 0;"><strong>📦 Número do Pedido:</strong> #${order.id.substring(0, 8)}</p>
                <p style="margin: 0;"><strong>📧 Email:</strong> ${order.customerEmail}</p>
              </div>
              
              <h2 style="color: #6b7280; font-size: 18px; margin-top: 30px;">Itens do Pedido:</h2>
              
              ${order.items
                .map(
                  (item: OrderItem) => `
                <div class="item">
                  <p style="margin: 0 0 5px 0; font-weight: bold;">${item.product?.name || "Produto"}</p>
                  ${item.selectedLetter ? `<p style="margin: 0 0 5px 0; color: #a855f7; font-size: 14px;">Letra: ${item.selectedLetter}</p>` : ""}
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    Quantidade: ${item.quantity}x • Preço unit.: R$ ${item.unitPrice.toFixed(2)}
                  </p>
                </div>
              `,
                )
                .join("")}
              
              <div class="total">
                <p style="margin: 0 0 5px 0; font-size: 14px; color: #6b7280;">Valor Total</p>
                <p class="total-amount">R$ ${order.total.toFixed(2)}</p>
              </div>
              
              <p style="margin-top: 30px;">Em breve você receberá mais informações sobre o envio do seu pedido.</p>
              
              <p>Se tiver alguma dúvida, entre em contato conosco pelo WhatsApp: <a href="https://wa.me/5531994773257" style="color: #a855f7;">+55 31 99477-3257</a></p>
            </div>
            
            <div class="footer">
              <p>Este é um email automático, não é necessário responder.</p>
              <p>© ${new Date().getFullYear()} Loja Artesanal. Todos os direitos reservados.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Erro ao enviar email:", error);
      return { success: false, error };
    }

    console.log("✅ Email enviado com sucesso:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return { success: false, error };
  }
}
