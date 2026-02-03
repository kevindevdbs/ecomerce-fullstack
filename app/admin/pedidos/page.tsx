import { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { FaEye, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import DeleteOrderButton from "@/components/admin/DeleteOrderButton";

export const metadata: Metadata = {
  title: "Pedidos | Admin",
  description: "Gerenciamento de pedidos",
};

export const dynamic = "force-dynamic";

function getStatusBadge(status: string) {
  const statusMap: Record<
    string,
    {
      label: string;
      color: string;
      icon: React.ComponentType<{ className?: string }>;
    }
  > = {
    pending: {
      label: "Pendente",
      color: "bg-yellow-100 text-yellow-800",
      icon: FaClock,
    },
    approved: {
      label: "Aprovado",
      color: "bg-green-100 text-green-800",
      icon: FaCheckCircle,
    },
    rejected: {
      label: "Rejeitado",
      color: "bg-red-100 text-red-800",
      icon: FaTimesCircle,
    },
    cancelled: {
      label: "Cancelado",
      color: "bg-gray-100 text-gray-800",
      icon: FaTimesCircle,
    },
    refunded: {
      label: "Reembolsado",
      color: "bg-purple-100 text-purple-800",
      icon: FaTimesCircle,
    },
  };

  const config = statusMap[status] || statusMap.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${config.color}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

export default async function PedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  type Order = (typeof orders)[0];

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
            📦 Pedidos
          </h1>
          <p className="text-slate-600">Gerencie todos os pedidos recebidos</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-slate-600 text-sm mb-1">Total de Pedidos</p>
            <p className="text-3xl font-bold text-slate-800">{orders.length}</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6 shadow-sm">
            <p className="text-green-700 text-sm mb-1">Aprovados</p>
            <p className="text-3xl font-bold text-green-800">
              {
                orders.filter(
                  (o: { status: string }) => o.status === "approved",
                ).length
              }
            </p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-6 shadow-sm">
            <p className="text-yellow-700 text-sm mb-1">Pendentes</p>
            <p className="text-3xl font-bold text-yellow-800">
              {
                orders.filter((o: { status: string }) => o.status === "pending")
                  .length
              }
            </p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 shadow-sm">
            <p className="text-blue-700 text-sm mb-1">Receita Total</p>
            <p className="text-3xl font-bold text-blue-800">
              R${" "}
              {orders
                .filter((o: { status: string }) => o.status === "approved")
                .reduce((sum: number, o: { total: number }) => sum + o.total, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Cliente
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                    Data
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Nenhum pedido encontrado
                    </td>
                  </tr>
                ) : (
                  orders.map((order: Order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-mono text-slate-600">
                        {order.id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-semibold text-slate-800">
                            {order.customerName || "Não informado"}
                          </p>
                          <p className="text-slate-500 text-xs">
                            {order.customerEmail || "-"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">
                        R$ {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/pedidos/${order.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                          >
                            <FaEye />
                            Ver Detalhes
                          </Link>
                          <DeleteOrderButton
                            orderId={order.id}
                            orderReference={order.id.substring(0, 8)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
