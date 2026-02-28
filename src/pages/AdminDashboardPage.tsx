import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, DollarSign, Users, Package, Store, ShieldCheck, Wallet, QrCode, Plus, Trash2 } from "lucide-react";
import LuxuryHeader from "@/components/LuxuryHeader";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, WalletSetting, StoreApplication } from "@/lib/supabase";
import { toast } from "sonner";
import QRCode from 'qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"kyc" | "orders" | "stores" | "requests" | "wallet">("wallet");
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile.role !== 'admin') {
      toast.error("Access denied. Admin only.");
      navigate('/catalog');
    }
  }, [profile, navigate]);

  const tabs = [
    { id: "wallet" as const, label: "Wallet Settings", icon: Wallet },
    { id: "kyc" as const, label: "KYC Applications", icon: ShieldCheck },
    { id: "orders" as const, label: "Order Management", icon: Package },
    { id: "stores" as const, label: "Stores", icon: Store },
    { id: "requests" as const, label: "Requests", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LuxuryHeader title="Admin Dashboard" subtitle="ADMINISTRATION" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="-mt-6 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Pending KYC", value: "0", isGold: true },
            { label: "Active Stores", value: "0", isGold: false },
            { label: "Open Orders", value: "0", isGold: true },
            { label: "Wallets", value: "0", isGold: false },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`p-6 ${stat.isGold ? "border border-accent gold-gradient" : "bg-primary"}`}
            >
              <p className={`font-display text-3xl font-light ${stat.isGold ? "text-primary" : "text-primary-foreground"}`}>{stat.value}</p>
              <p className={`mt-1 font-sans text-xs tracking-wide ${stat.isGold ? "text-primary/70" : "text-primary-foreground/70"}`}>{stat.label.toUpperCase()}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-8 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 py-4 font-sans text-xs tracking-luxury transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="py-10">
          {activeTab === "wallet" && <AdminWallet />}
          {activeTab === "kyc" && <AdminKYC />}
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "stores" && <AdminStores />}
          {activeTab === "requests" && <AdminRequests />}
        </div>
      </div>
    </div>
  );
};

const AdminWallet = () => {
  const [wallets, setWallets] = useState<WalletSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newWallet, setNewWallet] = useState({ address: '', type: 'Bitcoin' });

  const fetchWallets = async () => {
    const { data, error } = await supabase
      .from('wallet_settings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to load wallets");
    } else {
      setWallets(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const generateQRCode = async (address: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(address, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return qrCodeDataUrl;
    } catch (error) {
      console.error('QR Code generation error:', error);
      return null;
    }
  };

  const handleAddWallet = async () => {
    if (!newWallet.address.trim()) {
      toast.error("Please enter a wallet address");
      return;
    }

    setLoading(true);
    const qrCodeUrl = await generateQRCode(newWallet.address);

    const { error } = await supabase
      .from('wallet_settings')
      .insert({
        wallet_address: newWallet.address,
        wallet_type: newWallet.type,
        qr_code_url: qrCodeUrl,
        is_active: true,
      });

    if (error) {
      toast.error("Failed to add wallet");
    } else {
      toast.success("Wallet added successfully!");
      setNewWallet({ address: '', type: 'Bitcoin' });
      setShowAddDialog(false);
      fetchWallets();
    }
    setLoading(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('wallet_settings')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      toast.error("Failed to update wallet status");
    } else {
      toast.success(currentStatus ? "Wallet deactivated" : "Wallet activated");
      fetchWallets();
    }
  };

  const handleDeleteWallet = async (id: string) => {
    if (!confirm("Are you sure you want to delete this wallet?")) return;

    const { error } = await supabase
      .from('wallet_settings')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete wallet");
    } else {
      toast.success("Wallet deleted successfully");
      fetchWallets();
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-medium text-foreground">Payment Wallet Settings</h3>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            Manage cryptocurrency wallets for customer deposits
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button variant="gold" size="sm">
              <Plus className="mr-1 h-4 w-4" /> Add Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Add New Wallet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="mb-1.5 block font-sans text-xs uppercase tracking-wide text-muted-foreground">
                  Wallet Type
                </label>
                <select
                  className="w-full border border-border bg-background px-3 py-2 font-sans text-sm"
                  value={newWallet.type}
                  onChange={(e) => setNewWallet({ ...newWallet, type: e.target.value })}
                >
                  <option>Bitcoin</option>
                  <option>Ethereum</option>
                  <option>USDT (TRC20)</option>
                  <option>USDT (ERC20)</option>
                  <option>Litecoin</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block font-sans text-xs uppercase tracking-wide text-muted-foreground">
                  Wallet Address
                </label>
                <Input
                  placeholder="Enter wallet address"
                  value={newWallet.address}
                  onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
                  className="font-mono text-sm"
                />
              </div>
              <Button onClick={handleAddWallet} disabled={loading} className="w-full" variant="gold">
                {loading ? "Generating QR Code..." : "Add Wallet"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading && wallets.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-sans text-sm text-muted-foreground">Loading wallets...</p>
        </div>
      ) : wallets.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-accent/30">
          <Wallet className="mx-auto h-12 w-12 text-accent/50" />
          <p className="mt-4 font-sans text-sm text-muted-foreground">No wallets configured yet</p>
          <p className="mt-1 font-sans text-xs text-muted-foreground">Add your first wallet to start accepting payments</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {wallets.map((wallet) => (
            <div key={wallet.id} className="border border-accent/20 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-sans text-sm font-medium text-foreground">{wallet.wallet_type}</h4>
                    <span className={`inline-block px-2 py-0.5 font-sans text-xs ${
                      wallet.is_active
                        ? "bg-accent/10 text-accent border border-accent/30"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {wallet.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-xs text-muted-foreground break-all">{wallet.wallet_address}</p>

                  {wallet.qr_code_url && (
                    <div className="mt-4">
                      <img
                        src={wallet.qr_code_url}
                        alt="QR Code"
                        className="h-32 w-32 border border-accent/20"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  variant={wallet.is_active ? "outline" : "gold"}
                  size="sm"
                  onClick={() => handleToggleActive(wallet.id, wallet.is_active)}
                >
                  {wallet.is_active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteWallet(wallet.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminKYC = () => {
  const [applications, setApplications] = useState<StoreApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('store_applications')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to load applications");
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (appId: string, userId: string) => {
    const { error: updateError } = await supabase
      .from('store_applications')
      .update({ status: 'approved' })
      .eq('id', appId);

    if (updateError) {
      toast.error("Failed to approve application");
      return;
    }

    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({ role: 'store' })
      .eq('id', userId);

    if (profileError) {
      toast.error("Failed to update user role");
    } else {
      toast.success("Application approved successfully!");
      fetchApplications();
    }
  };

  const handleReject = async (appId: string) => {
    const { error } = await supabase
      .from('store_applications')
      .update({ status: 'rejected' })
      .eq('id', appId);

    if (error) {
      toast.error("Failed to reject application");
    } else {
      toast.success("Application rejected");
      fetchApplications();
    }
  };

  return (
    <div>
      <h3 className="font-display text-xl font-medium text-foreground">Pending KYC Applications</h3>
      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="font-sans text-sm text-muted-foreground">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="font-sans text-sm text-muted-foreground">No pending applications</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between border border-accent/20 p-6 transition-all hover:shadow-gold-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-accent/30 font-sans text-sm font-medium text-accent gold-gradient">
                  <span className="text-primary">{app.business_name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-foreground">{app.business_name}</h4>
                  <p className="font-sans text-xs text-muted-foreground">{app.business_email}</p>
                  <p className="font-sans text-xs text-muted-foreground">{app.business_phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="gold" size="sm" onClick={() => handleApprove(app.id, app.user_id)}>
                  <CheckCircle className="mr-1 h-4 w-4" /> Approve
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleReject(app.id)}>
                  <XCircle className="mr-1 h-4 w-4" /> Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AdminOrders = () => (
  <div>
    <div className="mb-6 flex items-center justify-between">
      <h3 className="font-display text-xl font-medium text-foreground">Order Management</h3>
    </div>
    <div className="py-12 text-center border border-dashed border-accent/30">
      <Package className="mx-auto h-12 w-12 text-accent/50" />
      <p className="mt-4 font-sans text-sm text-muted-foreground">No orders yet</p>
    </div>
  </div>
);

const AdminStores = () => (
  <div>
    <h3 className="font-display text-xl font-medium text-foreground">Active Stores</h3>
    <div className="mt-6 py-12 text-center border border-dashed border-accent/30">
      <Store className="mx-auto h-12 w-12 text-accent/50" />
      <p className="mt-4 font-sans text-sm text-muted-foreground">No active stores yet</p>
    </div>
  </div>
);

const AdminRequests = () => (
  <div>
    <h3 className="font-display text-xl font-medium text-foreground">Pending Requests</h3>
    <div className="mt-6 py-12 text-center border border-dashed border-accent/30">
      <Users className="mx-auto h-12 w-12 text-accent/50" />
      <p className="mt-4 font-sans text-sm text-muted-foreground">No pending requests</p>
    </div>
  </div>
);

export default AdminDashboardPage;
