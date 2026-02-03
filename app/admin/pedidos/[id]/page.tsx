import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaEnvelope,
  FaPhone,
  FaCreditCard,
} from "react-icons/fa";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Detalhes do Pedido | Admin",
};

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function getStatusInfo(status: string) {
  const statusMap: Record<
    string,
    {
      label: string;
      color: string;
      bgColor: string;
      icon: React.ComponentType<{ className?: string }>;
    }
  > = {
    pending: {
      label: "Pendente",
      color: "text-yellow-800",
      bgColor: "bg-yellow-50",
      icon: FaClock,
    },
    approved: {
      label: "Aprovado",
      color: "text-green-800",
      bgColor: "bg-green-50",
      icon: FaCheckCircle,
    },
    rejected: {
      label: "Rejeitado",
      color: "text-red-800",
      bgColor: "bg-red-50",
      icon: FaTimesCircle,
    },
    cancelled: {
      label: "Cancelado",
      color: "text-gray-800",
      bgColor: "bg-gray-50",
      icon: FaTimesCircle,
    },
    refunded: {
      label: "Reembolsado",
      color: "text-purple-800",
      bgColor: "bg-purple-50",
      icon: FaTimesCircle,
    },
  };

  return statusMap[status] || statusMap.pending;
}

export default async function PedidoDetalhesPage({ params }: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    notFound();
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const items = Array.isArray(order.items) ? order.items : [];

  interface OrderItem {
    product?: {
      id: string;
      name: string;
      image: string | null;
    };
    quantity: number;
    unitPrice: number;
    selectedLetter?: string;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/pedidos"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4"
          >
            <FaArrowLeft />
            Voltar para Pedidos
          </Link>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
            Pedido #{id.substring(0, 8)}
          </h1>
          <p className="text-slate-600">
            Criado em{" "}
            {new Date(order.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status */}
            <div
              className={`${statusInfo.bgColor} rounded-2xl p-6 border-2 border-${statusInfo.color.replace("text-", "")}-200`}
            >
              <div className="flex items-center gap-3">
                <StatusIcon className={`w-8 h-8 ${statusInfo.color}`} />
                <div>
                  <p className="text-sm text-slate-600">Status do Pedido</p>
                  <p className={`text-2xl font-bold ${statusInfo.color}`}>
                    {statusInfo.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Itens do Pedido */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                📦 Itens do Pedido
              </h2>
              <div className="space-y-4">
                {items.length === 0 ? (
                  <p className="text-slate-500">Nenhum item encontrado</p>
                ) : (
                  (items as unknown as OrderItem[]).map(
                    (item, index: number) => (
                      <div
                        key={index}
                        className="flex gap-4 pb-4 border-b border-slate-100 last:border-0"
                      >
                        {item.product?.image && (
                          <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product?.name || "Produto"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800">
                            {item.product?.name || "Produto"}
                          </h3>
                          {item.selectedLetter && (
                            <p className="text-sm text-purple-600 font-semibold">
                              Letra: {item.selectedLetter}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-slate-600">
                              Qtd: {item.quantity}x
                            </p>
                            <p className="font-bold text-slate-800">
                              R$ {(item.unitPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )
                )}
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t-2 border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-700">
                    Total
                  </span>
                  <span className="text-3xl font-extrabold text-purple-600">
                    R$ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Informações do Cliente */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                👤 Cliente
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Nome</p>
                  <p className="font-semibold text-slate-800">
                    {order.customerName || "Não informado"}
                  </p>
                </div>
                {order.customerEmail && (
                  <div>
                    <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">
                      <FaEnvelope className="w-3 h-3" /> Email
                    </p>
                    <p className="font-semibold text-slate-800 text-sm break-all">
                      {order.customerEmail}
                    </p>
                  </div>
                )}
                {order.customerPhone && (
                  <div>
                    <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">
                      <FaPhone className="w-3 h-3" /> Telefone
                    </p>
                    <p className="font-semibold text-slate-800">
                      {order.customerPhone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Informações de Pagamento */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                💳 Pagamento
              </h2>
              <div className="space-y-3">
                {order.paymentId && (
                  <div>
                    <p className="text-sm text-slate-500 mb-1">
                      ID do Pagamento
                    </p>
                    <p className="font-mono text-sm font-semibold text-slate-800 break-all">
                      {order.paymentId}
                    </p>
                  </div>
                )}
                {order.paymentMethod && (
                  <div>
                    <p className="text-sm text-slate-500 mb-1 flex items-center gap-1">
                      <FaCreditCard className="w-3 h-3" /> Método
                    </p>
                    <p className="font-semibold text-slate-800 uppercase">
                      {order.paymentMethod.replace("_", " ")}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Última Atualização
                  </p>
                  <p className="font-semibold text-slate-800 text-sm">
                    {new Date(order.updatedAt).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
