"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blockchainService } from "@/services/blockchain.service";
import { Wallet } from "@/types/blockchain.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Badge } from "@/components/shadcn/ui/badge";
import { Separator } from "@/components/shadcn/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { toast } from "sonner";
import {
  Wallet2,
  Copy,
  RefreshCw,
  Plus,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Lock,
  Users,
  Clock,
  Award,
  Target,
  Rocket,
  Heart,
  Star,
  Briefcase,
  Code,
  Wallet as WalletIcon,
  Search,
  ArrowRight,
} from "lucide-react";
import { FeatureCards } from "../cards/feature-cards";

interface WalletManagerProps {
  userId?: string;
}

// Wallet Features
export const walletFeatures = [
  {
    icon: Sparkles,
    title: "Enterprise-Grade Security & Advanced Encryption",
    description:
      "Experience unparalleled protection with military-grade AES-256 encryption, multi-layer security protocols, and advanced cryptographic algorithms.",
    detailedDescription:
      "Our security infrastructure implements multiple layers of protection including end-to-end encryption, biometric authentication, hardware security modules (HSM), and quantum-resistant algorithms. Every transaction is secured with military-grade protocols used by government agencies worldwide.",
    specifications: [
      "AES-256 encryption with rotating keys",
      "Multi-signature wallet support",
      "Hardware security module integration",
      "Biometric authentication (fingerprint, face recognition)",
      "Quantum-resistant cryptographic algorithms",
      "Real-time threat detection and monitoring",
      "Secure enclave technology for key storage",
    ],
    benefits: [
      "Complete protection against cyber attacks",
      "Privacy-focused design with zero data collection",
      "Compliance with international security standards",
      "Peace of mind for high-value transactions",
      "Future-proof security architecture",
    ],
    color: "blue" as const,
    image: "/characters/armor.jpg",
  },
  {
    icon: CheckCircle,
    title: "Lightning-Fast Performance & Instant Deployment",
    description:
      "Create and deploy your secure wallet infrastructure in seconds with our revolutionary instant creation technology.",
    detailedDescription:
      "Built on cutting-edge blockchain infrastructure with optimized consensus mechanisms, our platform delivers sub-second transaction processing and instant wallet deployment. Experience the fastest blockchain voting system with 99.99% uptime guarantee.",
    specifications: [
      "Sub-second transaction processing",
      "Instant wallet creation (< 3 seconds)",
      "Auto-scaling infrastructure",
      "99.99% uptime SLA guarantee",
      "Global CDN distribution",
      "Real-time synchronization",
      "Load balancing across multiple nodes",
    ],
    benefits: [
      "Zero waiting time for users",
      "Seamless voting experience",
      "Handles millions of concurrent users",
      "Reduced operational costs",
      "Global accessibility with low latency",
    ],
    color: "green" as const,
    image: "/characters/speed.jpg",
  },
  {
    icon: TrendingUp,
    title: "Cutting-Edge Technology & Future-Ready Innovation",
    description:
      "Powered by the latest advancements in distributed ledger technology, quantum-resistant cryptography, and next-generation blockchain protocols.",
    detailedDescription:
      "Our platform leverages breakthrough technologies including AI-powered analytics, machine learning fraud detection, and interoperable blockchain networks. Built for the future of digital democracy with support for emerging technologies and scalable architecture.",
    specifications: [
      "AI-powered transaction analysis",
      "Machine learning fraud detection",
      "Cross-chain interoperability",
      "Smart contract automation",
      "Quantum-resistant architecture",
      "WebAssembly runtime support",
      "GraphQL API endpoints",
    ],
    benefits: [
      "Future-proof technology stack",
      "Seamless integration with existing systems",
      "Advanced analytics and reporting",
      "Automated governance features",
      "Scalable for global deployments",
    ],
    color: "purple" as const,
    image: "/characters/modern.jpg",
  },
];
// Blockchain Features
export const blockchainFeatures = [
  {
    icon: Shield,
    title: "Immutable",
    description: "Cannot be changed",
    color: "blue" as const,
  },
  {
    icon: Globe,
    title: "Decentralized",
    description: "Global network",
    color: "green" as const,
  },
  {
    icon: Lock,
    title: "Transparent",
    description: "Publicly verifiable",
    color: "indigo" as const,
  },
  {
    icon: Zap,
    title: "Efficient",
    description: "Low gas fees",
    color: "yellow" as const,
  },
];

// Voting Features
export const votingFeatures = [
  {
    icon: Users,
    title: "Democratic",
    description: "One person, one vote",
    color: "blue" as const,
  },
  {
    icon: Shield,
    title: "Anonymous",
    description: "Privacy protected",
    color: "purple" as const,
  },
  {
    icon: CheckCircle,
    title: "Verifiable",
    description: "Audit friendly",
    color: "green" as const,
  },
];

// Service Features
export const serviceFeatures = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always available",
    color: "blue" as const,
  },
  {
    icon: Award,
    title: "Certified",
    description: "Industry standards",
    color: "yellow" as const,
  },
  {
    icon: Target,
    title: "Accurate",
    description: "99.9% uptime",
    color: "green" as const,
  },
  {
    icon: Rocket,
    title: "Scalable",
    description: "Grows with you",
    color: "purple" as const,
  },
];

// App Features
export const appFeatures = [
  {
    icon: Heart,
    title: "User Friendly",
    description: "Easy to use",
    color: "pink" as const,
  },
  {
    icon: Star,
    title: "Premium",
    description: "Top quality",
    color: "yellow" as const,
  },
  {
    icon: Briefcase,
    title: "Professional",
    description: "Enterprise ready",
    color: "indigo" as const,
  },
  {
    icon: Code,
    title: "Open Source",
    description: "Transparent code",
    color: "green" as const,
  },
];

export const EnhancedWalletManager = ({
  userId = "demo-user",
}: WalletManagerProps) => {
  const [wallet, setWallet] = useState<Wallet>();
  const [allWallets, setAllWallets] = useState<Wallet[]>([]);
  const [balance, setBalance] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingWallets, setIsLoadingWallets] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // loadWallet();
  }, [userId]);

  // const loadWallet = async () => {
  //   setIsLoading(true);
  //   try {
  //     const walletData = await blockchainService.getAllWallets();
  //     console.log(walletData);
  //     if (walletData && walletData.length > 0) {
  //       setWallet(walletData[0]);
  //       setAllWallets(walletData);
  //       await refreshBalance(walletData[0].address);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to load wallet data");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const loadAllWallets = async () => {
    setIsLoadingWallets(true);
    try {
      const walletData = await blockchainService.getAllWallets();
      setAllWallets(walletData);
      toast.success(`Loaded ${walletData.length} wallets`);
    } catch (error) {
      toast.error("Failed to load wallets");
    } finally {
      setIsLoadingWallets(false);
    }
  };

  const selectWallet = async (selectedWallet: Wallet) => {
    try {
      setWallet(selectedWallet);
      await refreshBalance(selectedWallet.address);
      setIsWalletDialogOpen(false);
      toast.success(
        `Selected wallet: ${formatAddress(selectedWallet.address)}`
      );
    } catch (error) {
      toast.error("Failed to select wallet");
    }
  };

  const createWallet = async () => {
    setIsCreating(true);
    try {
      const newWallet = await blockchainService.createWallet();
      setWallet(newWallet);
      setBalance("0");
      // Refresh the wallets list
      await loadAllWallets();
      toast.success("Your blockchain wallet has been created successfully");
    } catch (error) {
      toast.error("Failed to create wallet. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const refreshBalance = async (address?: string) => {
    if (!address && !wallet?.address) return;

    setIsRefreshing(true);
    try {
      const balanceData = {
        balance: "100",
      };
      setBalance(balanceData.balance);
    } catch (error) {
      toast.error("Failed to refresh balance");
    } finally {
      setIsRefreshing(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast.success(`${type} copied to clipboard`);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const filteredWallets = allWallets.filter(
    (w) =>
      w.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Wallet Selection Modal Component
  const WalletSelectionModal = () => (
    <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5" />
            Select Wallet
          </DialogTitle>
          <DialogDescription>
            Choose a wallet from your collection to manage
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search wallets by address or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Wallets List */}
          <ScrollArea className="h-96">
            <div className="space-y-2 pr-4">
              {isLoadingWallets ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">
                    Loading wallets...
                  </span>
                </div>
              ) : filteredWallets.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm
                    ? "No wallets found matching your search"
                    : "No wallets available"}
                </div>
              ) : (
                filteredWallets.map((walletItem) => (
                  <motion.div
                    key={walletItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                      wallet?.id === walletItem.id
                        ? "bg-primary/5 border-primary/50 shadow-sm"
                        : "bg-card hover:bg-accent/50"
                    }`}
                    onClick={() => selectWallet(walletItem)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            walletItem.isActive
                              ? "bg-green-100 dark:bg-green-900/20"
                              : "bg-gray-100 dark:bg-gray-900/20"
                          }`}
                        >
                          <Wallet2
                            className={`h-5 w-5 ${
                              walletItem.isActive
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-mono text-sm font-medium">
                              {formatAddress(walletItem.address)}
                            </p>
                            {wallet?.id === walletItem.id && (
                              <Badge variant="default" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-xs text-muted-foreground">
                              Balance: {walletItem.balance} ETH
                            </p>
                            <Badge
                              variant={
                                walletItem.isActive ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {walletItem.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(walletItem.address, "Address");
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {filteredWallets.length} wallet(s) available
            </p>
            <Button
              variant="outline"
              onClick={() => {
                loadAllWallets();
                setSearchTerm("");
              }}
              disabled={isLoadingWallets}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${
                  isLoadingWallets ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (!wallet) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
          <CardHeader className="font-mulish space-y-4 relative flex gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm flex items-center justify-center"
            >
              <Wallet2 className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create Your Blockchain Wallet
              </CardTitle>
              <CardDescription className="text-base mt-2 text-muted-foreground font-mulish">
                Get started with blockchain voting by creating your secure
                wallet
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 relative">
            <FeatureCards features={walletFeatures} />

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Generate Wallet Button */}
              <Button
                onClick={createWallet}
                disabled={isCreating}
                size="lg"
                className="group relative h-14 bg-gradient-to-r from-[#ffb700] via-[#ffaa00] to-[#ffa200] 
                          hover:from-[#e6a500] hover:via-[#e69900] hover:to-[#e69200]
                          text-white font-bold shadow-lg hover:shadow-xl 
                          transform hover:scale-105 transition-all duration-300
                          before:absolute before:inset-0 before:rounded-md
                          before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0
                          before:translate-x-[-100%] hover:before:translate-x-[100%]
                          before:transition-transform before:duration-700
                          overflow-hidden cursor-pointer"
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin relative z-10" />
                    <span className="relative z-10">Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10 font-mulish">
                      Generate Wallet
                    </span>
                  </>
                )}
              </Button>

              {/* All Wallets Button - Now Functional */}
              <Button
                onClick={() => {
                  loadAllWallets();
                  setIsWalletDialogOpen(true);
                }}
                size="lg"
                variant="outline"
                className="group relative h-14 border-2 border-purple-500/50 hover:border-purple-400/70
                          bg-gradient-to-r from-purple-500/10 to-pink-500/10
                          hover:from-purple-500/20 hover:to-pink-500/20
                          text-foreground hover:text-purple-400
                          shadow-[0_4px_20px_rgba(139,69,255,0.2)] 
                          hover:shadow-[0_6px_30px_rgba(139,69,255,0.3)]
                          transform hover:scale-105 transition-all duration-300
                          before:absolute before:inset-0 before:rounded-md
                          before:bg-gradient-to-r before:from-transparent before:via-purple-500/10 before:to-transparent
                          before:translate-x-[-100%] hover:before:translate-x-[100%]
                          before:transition-transform before:duration-700
                          overflow-hidden cursor-pointer"
              >
                <WalletIcon className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="relative z-10 font-mulish">All Wallets</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Selection Modal */}
        <WalletSelectionModal />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-emerald-950/20 dark:via-background dark:to-blue-950/20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5" />

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center"
              >
                <Wallet2 className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Your Blockchain Wallet
                </CardTitle>
                <CardDescription>
                  Manage your secure voting wallet
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={wallet.isActive ? "default" : "secondary"}
                className={`${
                  wallet.isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""
                } text-white px-3 py-1`}
              >
                {wallet.isActive ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Inactive
                  </>
                )}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  loadAllWallets();
                  setIsWalletDialogOpen(true);
                }}
                className="text-xs"
              >
                <WalletIcon className="h-4 w-4 mr-1" />
                Switch
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          {/* Balance Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Current Balance</p>
                <p className="text-3xl font-bold">{balance} ETH</p>
                <p className="text-sm opacity-75">
                  ≈ ${(parseFloat(balance) * 2000).toFixed(2)} USD
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => refreshBalance()}
                disabled={isRefreshing}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </motion.div>

          <Separator className="my-6" />

          {/* Wallet Details */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium flex items-center space-x-2">
                <span>Wallet Address</span>
                <Badge variant="outline" className="text-xs">
                  Public
                </Badge>
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={wallet.address}
                  readOnly
                  className="font-mono text-sm bg-white/50 dark:bg-white/5 border-0"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(wallet.address, "Address")}
                  className="shrink-0"
                >
                  <AnimatePresence mode="wait">
                    {copied === "Address" ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this address to receive payments
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium flex items-center space-x-2">
                <span>Public Key</span>
                <Badge variant="outline" className="text-xs">
                  Verification
                </Badge>
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  value={
                    showPrivateKey
                      ? wallet.publicKey
                      : formatAddress(wallet.publicKey)
                  }
                  readOnly
                  className="font-mono text-xs bg-white/50 dark:bg-white/5 border-0"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="shrink-0"
                >
                  {showPrivateKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(wallet.publicKey, "Public Key")
                  }
                  className="shrink-0"
                >
                  <AnimatePresence mode="wait">
                    {copied === "Public Key" ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Used for transaction verification
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4 border-t border-border/50"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">
                  {new Date(wallet.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Selection Modal */}
      <WalletSelectionModal />
    </motion.div>
  );
};
