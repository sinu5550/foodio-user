"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

interface OrderItem {
  id: string;
  menuItem: {
    name: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  totalAmount: number;
  status: "PENDING" | "PREPARING" | "READY" | "COMPLETED";
  items: OrderItem[];
  createdAt: string;
}

const statusSteps = ["PENDING", "PREPARING", "READY", "COMPLETED"];

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders(true);
    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      fetchOrders(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if no token
        window.location.href = "/auth/signin?redirect=/orders";
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        },
      );

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/auth/signin?redirect=/orders";
        return;
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  const getStatusIndex = (status: string) => statusSteps.indexOf(status);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner size={48} />
          <p className="text-brand-green/40 font-medium animate-pulse">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-beige py-32 px-10">
      <div className="max-w-7xl px-10 mx-auto">
        <h1 className="text-5xl tracking-[-0.05em] font-medium text-brand-green font-brand-cormorant mb-12">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-brand-green/40 font-medium">
            No orders yet. Start ordering from our menu!
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const currentStatusIndex = getStatusIndex(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-[#FBFAF8] rounded-2xl p-8 shadow-xs border border-[#E6E2D8]"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-brand-green font-brand-manrope">
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-brand-green/60 mt-1">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-bold text-gray-900 font-brand-manrope">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-sm font-medium capitalize border ${
                          order.status === "PENDING"
                            ? "bg-[#F0B100]/10 text-[#D08700] border-[#F0B100]/20"
                            : order.status === "PREPARING"
                              ? "bg-[#E6F4FF] text-[#0050B3] border-[#bdd0de]"
                              : order.status === "READY"
                                ? "bg-[#F9F0FF] text-[#531DAB] border-[#ded1e7]"
                                : "bg-[#008236]/10 text-[#008236] border-[#008236]/20"
                        }`}
                      >
                        {order.status.toLowerCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-brand-green/60 mb-3">
                      ITEMS
                    </p>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2"
                      >
                        <span className="text-brand-green font-brand-manrope">
                          {item.quantity}x {item.menuItem.name}
                        </span>
                        <span className="text-brand-green/60">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr className="border-brand-green/20 mb-6" />

                  <div className="mb-6">
                    <p className="text-sm text-brand-green/60">
                      <span className="font-semibold text-brand-green">
                        Delivering to:
                      </span>{" "}
                      {order.customerAddress}
                    </p>
                  </div>

                  <div className="relative pt-2 w-[70%] mx-auto">
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-brand-green/20 -translate-y-1/2" />

                    <div
                      className="absolute top-4 left-0 h-0.5 bg-brand-green -translate-y-1/2 transition-all duration-500 ease-in-out"
                      style={{
                        width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                      }}
                    />

                    <div className="relative flex justify-between">
                      {statusSteps.map((step, index) => {
                        const isActive = index <= currentStatusIndex;
                        const isCompleted = index < currentStatusIndex;

                        return (
                          <div
                            key={step}
                            className="flex flex-col items-center z-10"
                          >
                            <div
                              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                                isActive ? "bg-brand-green" : "bg-slate-300"
                              } ring ring-white`}
                            />
                            <p
                              className={`text-[10px] uppercase tracking-wider mt-3 font-medium transition-colors duration-300 ${
                                isActive
                                  ? "text-brand-green"
                                  : "text-brand-green/40"
                              }`}
                            >
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
