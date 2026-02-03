import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Inicializa o cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

interface CartItemAPI {
  product: {
    id: string;
    name: string;
    description?: string;
    image: string | null;
  };
  quantity: number;
  unitPrice: number;
  selectedLetter?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: CartItemAPI[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no carrinho" },
        { status: 400 },
      );
    }

    // Converte os itens do carrinho para o formato do Mercado Pago
    const preferenceItems = items.map((item, index) => ({
      id: `item-${index}`,
      title:
        item.product.name +
        (item.selectedLetter ? ` - Letra: ${item.selectedLetter}` : ""),
      description: item.product.description || "Produto artesanal",
      quantity: item.quantity,
      unit_price: item.unitPrice,
      currency_id: "BRL",
      picture_url: item.product.image || undefined,
    }));

    // Verifica se o access token está configurado
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          error:
            "Mercado Pago não configurado. Configure MERCADOPAGO_ACCESS_TOKEN no arquivo .env",
        },
        { status: 500 },
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Gerar referência externa única
    const externalReference = `order-${Date.now()}`;

    // Log para debug
    console.log("🔍 Criando preferência com:", {
      itemsCount: preferenceItems.length,
      baseUrl,
      backUrls: {
        success: `${baseUrl}/pagamento/sucesso`,
        failure: `${baseUrl}/pagamento/falha`,
        pending: `${baseUrl}/pagamento/pendente`,
      },
    });

    // Cria a preferência de pagamento
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: preferenceItems,
        payer: {
          name: "",
          surname: "",
          email: "",
          phone: {
            area_code: "",
            number: "",
          },
          identification: {
            type: "CPF",
            number: "",
          },
          address: {
            zip_code: "",
            street_name: "",
            street_number: "",
          },
        },
        payment_methods: {
          excluded_payment_methods: [],
          excluded_payment_types: [],
          installments: 12,
          default_installments: 1,
        },
        back_urls: {
          success: `${baseUrl}/pagamento/sucesso`,
          failure: `${baseUrl}/pagamento/falha`,
          pending: `${baseUrl}/pagamento/pendente`,
        },
        auto_return: "approved" as const,
        notification_url: `${baseUrl}/api/webhook`,
        statement_descriptor: "LOJA ARTESANAL",
        external_reference: externalReference,
      },
    });

    console.log("✅ Preferência criada:", result.id);

    // Criar pedido inicial no banco de dados
    const totalAmount = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    await prisma.order.create({
      data: {
        preferenceId: result.id,
        externalReference: externalReference,
        status: "pending",
        items: items as unknown as Prisma.InputJsonValue,
        total: totalAmount,
      },
    });

    console.log("💾 Pedido inicial salvo no banco");

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    });
  } catch (error: any) {
    console.error("Erro ao criar preferência de pagamento:", error);

    // Retorna mais detalhes do erro para debug
    const errorMessage = error?.message || "Erro ao processar pagamento";
    const errorDetails = error?.cause || error?.error || null;

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
        hint: !process.env.MERCADOPAGO_ACCESS_TOKEN
          ? "Configure suas credenciais do Mercado Pago no arquivo .env"
          : null,
      },
      { status: 500 },
    );
  }
}
