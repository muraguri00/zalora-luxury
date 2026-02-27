import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle, XCircle, Eye, DollarSign, Users, Package, Store, ShieldCheck } from "lucide-react";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"kyc" | "orders" | "stores" | "requests">("kyc");

  const tabs = [
    { id: "kyc" as const, label: "KYC Applications", icon: ShieldCheck },
    { id: "orders" as const, label: "Order Management", icon: Package },
    { id: "stores" as const, label: "Stores", icon: Store },
    { id: "requests" as const, label: "Requests", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-charcoal px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-xs uppercase tracking-luxury text-primary-foreground/50">
            Administration
          </p>
          <h1 className="mt-1 font-display text-3xl font-light text-primary-foreground">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Stats */}
        <div className="-mt-6 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Pending KYC", value: "3", color: "bg-accent" },
            { label: "Active Stores", value: "28", color: "bg-primary" },
            { label: "Open Orders", value: "15", color: "bg-accent" },
            { label: "Revenue (MTD)", value: "$142K", color: "bg-primary" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color === "bg-accent" ? "bg-accent" : "bg-primary"} p-6`}>
              <p className="font-display text-3xl font-light text-primary-foreground">{stat.value}</p>
              <p className="mt-1 font-body text-xs uppercase tracking-wide text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 py-4 font-body text-xs uppercase tracking-luxury transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-10">
          {activeTab === "kyc" && <AdminKYC />}
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "stores" && <AdminStores />}
          {activeTab === "requests" && <AdminRequests />}
        </div>
      </div>
    </div>
  );
};

const AdminKYC = () => (
  <div>
    <h3 className="font-display text-xl font-medium text-foreground">Pending KYC Applications</h3>
    <div className="mt-6 space-y-4">
      {[
        { name: "James Rodriguez", email: "james@email.com", date: "Feb 25, 2026", occupation: "Business Owner" },
        { name: "Sarah Kim", email: "sarah.k@email.com", date: "Feb 24, 2026", occupation: "Marketing Manager" },
        { name: "David Okonkwo", email: "david.o@email.com", date: "Feb 23, 2026", occupation: "Entrepreneur" },
      ].map((app) => (
        <div key={app.email} className="flex items-center justify-between border border-border p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-secondary font-body text-sm font-medium text-foreground">
              {app.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h4 className="font-body text-sm font-medium text-foreground">{app.name}</h4>
              <p className="font-body text-xs text-muted-foreground">{app.email} · Applied {app.date}</p>
              <p className="font-body text-xs text-muted-foreground">{app.occupation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Eye className="mr-1 h-4 w-4" /> Review</Button>
            <Button variant="gold" size="sm"><CheckCircle className="mr-1 h-4 w-4" /> Approve</Button>
            <Button variant="outline" size="sm"><XCircle className="mr-1 h-4 w-4" /> Reject</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminOrders = () => (
  <div>
    <div className="mb-6 flex items-center justify-between">
      <h3 className="font-display text-xl font-medium text-foreground">Order Management</h3>
      <Button variant="gold" size="sm">+ Create Order</Button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {["Order ID", "Customer", "Product", "Assigned Store", "Status", "Action"].map((h) => (
              <th key={h} className="pb-3 text-left font-body text-xs uppercase tracking-wide text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { id: "#ORD-2844", customer: "Emma Watson", product: "Aurum Timepiece", store: "Luxe Boutique", status: "Unassigned" },
            { id: "#ORD-2843", customer: "M. Chen", product: "Soie Royale Scarf", store: "Luxe Boutique", status: "Paid" },
            { id: "#ORD-2842", customer: "J. Williams", product: "Essence Nº 7", store: "Luxe Boutique", status: "Pending Payment" },
          ].map((order) => (
            <tr key={order.id} className="border-b border-border/50">
              <td className="py-4 font-body text-sm text-foreground">{order.id}</td>
              <td className="py-4 font-body text-sm text-foreground">{order.customer}</td>
              <td className="py-4 font-body text-sm text-foreground">{order.product}</td>
              <td className="py-4 font-body text-sm text-foreground">{order.store}</td>
              <td className="py-4">
                <span className={`inline-block px-3 py-1 font-body text-xs uppercase tracking-wide ${
                  order.status === "Unassigned" ? "bg-destructive/10 text-destructive" :
                  order.status === "Pending Payment" ? "bg-accent/10 text-accent" :
                  "bg-primary/5 text-foreground"
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="py-4">
                <Button variant="outline" size="sm">
                  {order.status === "Unassigned" ? "Assign Store" : "View Details"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminStores = () => (
  <div>
    <h3 className="font-display text-xl font-medium text-foreground">Active Stores</h3>
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {["Store Name", "Store ID", "Owner", "Products", "Balance", "Orders", "Action"].map((h) => (
              <th key={h} className="pb-3 text-left font-body text-xs uppercase tracking-wide text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Luxe Boutique", id: "ZLR-STORE-0042", owner: "Alexandra S.", products: 6, balance: "$4,250", orders: 142 },
            { name: "Elite Fashion", id: "ZLR-STORE-0038", owner: "James R.", products: 4, balance: "$1,800", orders: 67 },
            { name: "Prestige House", id: "ZLR-STORE-0029", owner: "Sarah K.", products: 5, balance: "$3,100", orders: 95 },
          ].map((store) => (
            <tr key={store.id} className="border-b border-border/50">
              <td className="py-4 font-body text-sm font-medium text-foreground">{store.name}</td>
              <td className="py-4 font-body text-xs text-muted-foreground">{store.id}</td>
              <td className="py-4 font-body text-sm text-foreground">{store.owner}</td>
              <td className="py-4 font-body text-sm text-foreground">{store.products}</td>
              <td className="py-4 font-body text-sm text-accent">{store.balance}</td>
              <td className="py-4 font-body text-sm text-foreground">{store.orders}</td>
              <td className="py-4">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">View</Button>
                  <Button variant="outline" size="sm"><DollarSign className="mr-1 h-3 w-3" /> Adjust Credits</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AdminRequests = () => (
  <div>
    <h3 className="font-display text-xl font-medium text-foreground">Pending Requests</h3>
    <div className="mt-6 space-y-4">
      {[
        { type: "BTC Recharge", store: "Luxe Boutique", detail: "Screenshot uploaded · $500", time: "2 hours ago" },
        { type: "BTC Withdrawal", store: "Elite Fashion", detail: "Wallet: bc1q...f8k2 · $300", time: "5 hours ago" },
        { type: "Product Removal", store: "Prestige House", detail: "Remove: Heritage Belt (ZLR-005)", time: "1 day ago" },
        { type: "Store Closure", store: "Vintage Luxe", detail: "Reason: Personal circumstances", time: "2 days ago" },
      ].map((req, i) => (
        <div key={i} className="flex items-center justify-between border border-border p-6">
          <div>
            <div className="flex items-center gap-3">
              <span className={`inline-block px-3 py-1 font-body text-xs uppercase tracking-wide ${
                req.type.includes("Recharge") ? "bg-accent/10 text-accent" :
                req.type.includes("Withdrawal") ? "bg-primary/5 text-foreground" :
                req.type.includes("Removal") ? "bg-secondary text-muted-foreground" :
                "bg-destructive/10 text-destructive"
              }`}>
                {req.type}
              </span>
              <span className="font-body text-sm font-medium text-foreground">{req.store}</span>
            </div>
            <p className="mt-1 font-body text-xs text-muted-foreground">{req.detail}</p>
            <p className="mt-0.5 font-body text-xs text-muted-foreground/60">{req.time}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="gold" size="sm"><CheckCircle className="mr-1 h-4 w-4" /> Approve</Button>
            <Button variant="outline" size="sm"><XCircle className="mr-1 h-4 w-4" /> Deny</Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminDashboardPage;
