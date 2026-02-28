import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Package, DollarSign, ShoppingBag, TrendingUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import LuxuryHeader from "@/components/LuxuryHeader";

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
      <LuxuryHeader title="Luxe Boutique" subtitle="STORE DASHBOARD" backTo="/profile" backLabel="PROFILE" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          <p className="font-sans text-xs text-muted-foreground">Store ID: ZLR-STORE-0042</p>
          <Button variant="gold-outline" size="sm">Request Store Closure</Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 py-4 font-sans text-xs tracking-luxury transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label.toUpperCase()}
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
        <div key={stat.label} className="border border-accent/20 p-6 transition-all hover:shadow-gold-sm">
          <div className="flex items-center justify-between">
            <stat.icon className="h-5 w-5 text-accent" />
            {stat.change && (
              <span className="font-sans text-xs text-accent">{stat.change}</span>
            )}
          </div>
          <p className="mt-4 font-display text-3xl font-light text-foreground">{stat.value}</p>
          <p className="mt-1 font-sans text-xs tracking-wide text-muted-foreground">{stat.label.toUpperCase()}</p>
        </div>
      ))}
    </div>

    <div className="mt-10">
      <h3 className="font-display text-xl font-medium text-foreground">Recent Orders</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent/20">
              {["Order ID", "Product", "Status", "Amount", "Commission"].map((h) => (
                <th key={h} className="pb-3 text-left font-sans text-xs tracking-wide text-accent">{h.toUpperCase()}</th>
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
                <td className="py-4 font-sans text-sm text-foreground">{order.id}</td>
                <td className="py-4 font-sans text-sm text-foreground">{order.product}</td>
                <td className="py-4">
                  <span className={`inline-block px-3 py-1 font-sans text-xs tracking-wide ${
                    order.status === "Shipped" ? "border border-accent/30 bg-accent/10 text-accent" :
                    order.status === "Processing" ? "bg-secondary text-muted-foreground" :
                    "bg-primary/5 text-foreground"
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 font-sans text-sm text-foreground">{order.amount}</td>
                <td className="py-4 font-sans text-sm text-accent">{order.commission}</td>
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
      {products.slice(0, 6).map((p) => (
        <div key={p.id} className="flex items-center gap-6 border border-accent/20 p-4 transition-all hover:shadow-gold-sm">
          <img src={p.image} alt={p.name} className="h-16 w-16 object-cover" />
          <div className="flex-1">
            <h4 className="font-sans text-sm font-medium text-foreground">{p.name}</h4>
            <p className="font-sans text-xs text-muted-foreground">{p.brand} · {p.id}</p>
          </div>
          <div className="text-right">
            <p className="font-sans text-sm text-foreground">${p.price.toLocaleString()}</p>
            <p className="font-sans text-xs text-muted-foreground">Wholesale: ${p.wholesalePrice.toLocaleString()}</p>
          </div>
          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
        </div>
      ))}
    </div>
    <p className="mt-4 font-sans text-xs text-muted-foreground">Product removal requests: 0/3 used today</p>
  </div>
);

const StoreOrders = () => (
  <div>
    <h3 className="font-display text-xl font-medium text-foreground">Assigned Orders</h3>
    <p className="mt-1 font-sans text-sm text-muted-foreground">Orders assigned by admin for fulfillment</p>
    <div className="mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-accent/20">
            {["Order ID", "Customer", "Product", "Wholesale Cost", "Retail Price", "Status", "Action"].map((h) => (
              <th key={h} className="pb-3 text-left font-sans text-xs tracking-wide text-accent">{h.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { id: "#ORD-2842", customer: "J. Williams", product: "Essence Nº 7", wholesale: "$256", retail: "$320", status: "Pending Payment" },
            { id: "#ORD-2843", customer: "M. Chen", product: "Soie Royale Scarf", wholesale: "$544", retail: "$680", status: "Paid – Ship Now" },
          ].map((order) => (
            <tr key={order.id} className="border-b border-border/50">
              <td className="py-4 font-sans text-sm text-foreground">{order.id}</td>
              <td className="py-4 font-sans text-sm text-foreground">{order.customer}</td>
              <td className="py-4 font-sans text-sm text-foreground">{order.product}</td>
              <td className="py-4 font-sans text-sm text-foreground">{order.wholesale}</td>
              <td className="py-4 font-sans text-sm text-foreground">{order.retail}</td>
              <td className="py-4">
                <span className={`inline-block px-3 py-1 font-sans text-xs tracking-wide ${
                  order.status.includes("Pending") ? "border border-accent/30 bg-accent/10 text-accent" : "bg-primary/5 text-foreground"
                }`}>
                  {order.status.toUpperCase()}
                </span>
              </td>
              <td className="py-4">
                <Button variant="gold" size="sm">
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
      {[
        { label: "Available Credits", value: "$4,250", highlight: false },
        { label: "Pending Withdrawals", value: "$800", highlight: true },
        { label: "Total Earned", value: "$5,680", highlight: false },
      ].map((stat) => (
        <div key={stat.label} className="border border-accent/20 p-6 transition-all hover:shadow-gold-sm">
          <p className="font-sans text-xs tracking-wide text-muted-foreground">{stat.label.toUpperCase()}</p>
          <p className={`mt-2 font-display text-4xl font-light ${stat.highlight ? "text-accent" : "text-foreground"}`}>{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {/* Recharge */}
      <div className="border border-accent/20 p-8 transition-all hover:shadow-gold-sm">
        <h3 className="font-display text-xl font-medium text-foreground">Recharge via BTC</h3>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Send BTC to the wallet below and upload a screenshot for admin approval.
        </p>
        <div className="mt-4 border border-accent/20 bg-secondary p-4">
          <p className="break-all font-sans text-xs text-foreground">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
        </div>
        <div className="mt-4 flex h-24 cursor-pointer items-center justify-center border-2 border-dashed border-accent/40 text-accent/60 transition-all hover:border-accent hover:bg-accent/5">
          <span className="font-sans text-xs tracking-wide">Upload BTC payment screenshot</span>
        </div>
        <Button variant="gold" size="lg" className="mt-4 w-full">Submit Recharge Request</Button>
      </div>

      {/* Withdraw */}
      <div className="border border-accent/20 p-8 transition-all hover:shadow-gold-sm">
        <h3 className="font-display text-xl font-medium text-foreground">Withdraw to BTC</h3>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Enter your BTC wallet address and amount to withdraw.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
              BTC WALLET ADDRESS
            </label>
            <input className="flex h-10 w-full border-2 border-border bg-secondary/50 px-4 py-2 font-sans text-sm tracking-wide transition-colors focus:border-accent focus:outline-none" placeholder="Enter wallet address" />
          </div>
          <div>
            <label className="mb-1.5 block font-sans text-xs font-semibold tracking-[0.15em] text-accent">
              AMOUNT (USD)
            </label>
            <input type="number" className="flex h-10 w-full border-2 border-border bg-secondary/50 px-4 py-2 font-sans text-sm tracking-wide transition-colors focus:border-accent focus:outline-none" placeholder="0.00" />
          </div>
        </div>
        <Button variant="default" size="lg" className="mt-4 w-full">Request Withdrawal</Button>
      </div>
    </div>
  </div>
);

export default StoreDashboardPage;
