import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Package, DollarSign, ShoppingBag, TrendingUp, Plus, Trash2, XCircle } from "lucide-react";
import { useState } from "react";

const StoreDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "balance">("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "products" as const, label: "Products" },
    { id: "orders" as const, label: "Orders" },
    { id: "balance" as const, label: "Balance" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-cream px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-xs uppercase tracking-luxury text-muted-foreground">Store Dashboard</p>
              <h1 className="mt-1 font-display text-3xl font-light text-foreground">Luxe Boutique</h1>
              <p className="mt-1 font-body text-xs text-muted-foreground">Store ID: ZLR-STORE-0042</p>
            </div>
            <Button variant="gold-outline" size="sm">Request Store Closure</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 py-4 font-body text-xs uppercase tracking-luxury transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-10">
          {activeTab === "overview" && <StoreOverview />}
          {activeTab === "products" && <StoreProducts />}
          {activeTab === "orders" && <StoreOrders />}
          {activeTab === "balance" && <StoreBalance />}
        </div>
      </div>
    </div>
  );
};

const StoreOverview = () => (
  <div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { icon: ShoppingBag, label: "Total Orders", value: "142", change: "+12%" },
        { icon: DollarSign, label: "Total Revenue", value: "$28,400", change: "+8.5%" },
        { icon: Package, label: "Products Listed", value: "6", change: "" },
        { icon: TrendingUp, label: "Commission Earned", value: "$5,680", change: "+15%" },
      ].map((stat) => (
        <div key={stat.label} className="border border-border p-6">
          <div className="flex items-center justify-between">
            <stat.icon className="h-5 w-5 text-muted-foreground" />
            {stat.change && (
              <span className="font-body text-xs text-accent">{stat.change}</span>
            )}
          </div>
          <p className="mt-4 font-display text-3xl font-light text-foreground">{stat.value}</p>
          <p className="mt-1 font-body text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>

    <div className="mt-10">
      <h3 className="font-display text-xl font-medium text-foreground">Recent Orders</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Order ID", "Product", "Status", "Amount", "Commission"].map((h) => (
                <th key={h} className="pb-3 text-left font-body text-xs uppercase tracking-wide text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id: "#ORD-2841", product: "Noir Structured Tote", status: "Shipped", amount: "$2,450", commission: "$490" },
              { id: "#ORD-2840", product: "Aurum Timepiece", status: "Processing", amount: "$8,900", commission: "$1,780" },
              { id: "#ORD-2839", product: "Heritage Belt", status: "Delivered", amount: "$890", commission: "$178" },
            ].map((order) => (
              <tr key={order.id} className="border-b border-border/50">
                <td className="py-4 font-body text-sm text-foreground">{order.id}</td>
                <td className="py-4 font-body text-sm text-foreground">{order.product}</td>
                <td className="py-4">
                  <span className={`inline-block px-3 py-1 font-body text-xs uppercase tracking-wide ${
                    order.status === "Shipped" ? "bg-accent/10 text-accent" :
                    order.status === "Processing" ? "bg-secondary text-muted-foreground" :
                    "bg-primary/5 text-foreground"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 font-body text-sm text-foreground">{order.amount}</td>
                <td className="py-4 font-body text-sm text-accent">{order.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const StoreProducts = () => (
  <div>
    <div className="mb-6 flex items-center justify-between">
      <h3 className="font-display text-xl font-medium text-foreground">Store Inventory</h3>
      <Button variant="gold" size="sm"><Plus className="mr-2 h-4 w-4" /> Add from Catalog</Button>
    </div>
    <div className="grid gap-4">
      {products.map((p) => (
        <div key={p.id} className="flex items-center gap-6 border border-border p-4">
          <img src={p.image} alt={p.name} className="h-16 w-16 object-cover" />
          <div className="flex-1">
            <h4 className="font-body text-sm font-medium text-foreground">{p.name}</h4>
            <p className="font-body text-xs text-muted-foreground">{p.brand} · {p.id}</p>
          </div>
          <div className="text-right">
            <p className="font-body text-sm text-foreground">${p.price.toLocaleString()}</p>
            <p className="font-body text-xs text-muted-foreground">Wholesale: ${p.wholesalePrice.toLocaleString()}</p>
          </div>
          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
        </div>
      ))}
    </div>
    <p className="mt-4 font-body text-xs text-muted-foreground">Product removal requests: 0/3 used today</p>
  </div>
);

const StoreOrders = () => (
  <div>
    <h3 className="font-display text-xl font-medium text-foreground">Assigned Orders</h3>
    <p className="mt-1 font-body text-sm text-muted-foreground">Orders assigned by admin for fulfillment</p>
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {["Order ID", "Customer", "Product", "Wholesale Cost", "Retail Price", "Status", "Action"].map((h) => (
              <th key={h} className="pb-3 text-left font-body text-xs uppercase tracking-wide text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { id: "#ORD-2842", customer: "J. Williams", product: "Essence Nº 7", wholesale: "$256", retail: "$320", status: "Pending Payment" },
            { id: "#ORD-2843", customer: "M. Chen", product: "Soie Royale Scarf", wholesale: "$544", retail: "$680", status: "Paid – Ship Now" },
          ].map((order) => (
            <tr key={order.id} className="border-b border-border/50">
              <td className="py-4 font-body text-sm text-foreground">{order.id}</td>
              <td className="py-4 font-body text-sm text-foreground">{order.customer}</td>
              <td className="py-4 font-body text-sm text-foreground">{order.product}</td>
              <td className="py-4 font-body text-sm text-foreground">{order.wholesale}</td>
              <td className="py-4 font-body text-sm text-foreground">{order.retail}</td>
              <td className="py-4">
                <span className={`inline-block px-3 py-1 font-body text-xs uppercase tracking-wide ${
                  order.status.includes("Pending") ? "bg-accent/10 text-accent" : "bg-primary/5 text-foreground"
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="py-4">
                <Button variant="default" size="sm">
                  {order.status.includes("Pending") ? "Pay & Process" : "Mark Shipped"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StoreBalance = () => (
  <div>
    <div className="grid gap-6 sm:grid-cols-3">
      <div className="border border-border p-6">
        <p className="font-body text-xs uppercase tracking-wide text-muted-foreground">Available Credits</p>
        <p className="mt-2 font-display text-4xl font-light text-foreground">$4,250</p>
      </div>
      <div className="border border-border p-6">
        <p className="font-body text-xs uppercase tracking-wide text-muted-foreground">Pending Withdrawals</p>
        <p className="mt-2 font-display text-4xl font-light text-accent">$800</p>
      </div>
      <div className="border border-border p-6">
        <p className="font-body text-xs uppercase tracking-wide text-muted-foreground">Total Earned</p>
        <p className="mt-2 font-display text-4xl font-light text-foreground">$5,680</p>
      </div>
    </div>

    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {/* Recharge */}
      <div className="border border-border p-8">
        <h3 className="font-display text-xl font-medium text-foreground">Recharge via BTC</h3>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          Send BTC to the wallet below and upload a screenshot for admin approval.
        </p>
        <div className="mt-4 bg-secondary p-4">
          <p className="break-all font-body text-xs text-foreground">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
        </div>
        <div className="mt-4 flex h-24 cursor-pointer items-center justify-center border border-dashed border-border text-muted-foreground transition-colors hover:border-accent">
          <span className="font-body text-xs">Upload BTC payment screenshot</span>
        </div>
        <Button variant="gold" size="lg" className="mt-4 w-full">Submit Recharge Request</Button>
      </div>

      {/* Withdraw */}
      <div className="border border-border p-8">
        <h3 className="font-display text-xl font-medium text-foreground">Withdraw to BTC</h3>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          Enter your BTC wallet address and amount to withdraw.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
              BTC Wallet Address
            </label>
            <input className="flex h-10 w-full border border-border bg-background px-3 py-2 font-body text-sm focus:outline-none" placeholder="Enter wallet address" />
          </div>
          <div>
            <label className="mb-1.5 block font-body text-xs uppercase tracking-wide text-muted-foreground">
              Amount (USD)
            </label>
            <input type="number" className="flex h-10 w-full border border-border bg-background px-3 py-2 font-body text-sm focus:outline-none" placeholder="0.00" />
          </div>
        </div>
        <Button variant="default" size="lg" className="mt-4 w-full">Request Withdrawal</Button>
      </div>
    </div>
  </div>
);

export default StoreDashboardPage;
