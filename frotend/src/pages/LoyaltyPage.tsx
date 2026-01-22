import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Plus,
  Gift,
  Star,
  Crown,
  Medal,
  Award,
  User,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Customer,
  sampleCustomers,
  loyaltyTiers,
  loyaltyRewards,
  calculateTier,
  LoyaltyReward,
} from '@/data/loyalty';

const getTierIcon = (tier: Customer['tier']) => {
  const icons = {
    bronze: <Medal className="w-5 h-5" />,
    silver: <Award className="w-5 h-5" />,
    gold: <Star className="w-5 h-5" />,
    platinum: <Crown className="w-5 h-5" />,
  };
  return icons[tier];
};

const LoyaltyPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const { toast } = useToast();

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const stats = {
    totalMembers: customers.length,
    bronze: customers.filter((c) => c.tier === 'bronze').length,
    silver: customers.filter((c) => c.tier === 'silver').length,
    gold: customers.filter((c) => c.tier === 'gold').length,
    platinum: customers.filter((c) => c.tier === 'platinum').length,
    totalPoints: customers.reduce((sum, c) => sum + c.points, 0),
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast({ title: 'Error', description: 'Name and email are required', variant: 'destructive' });
      return;
    }

    const customer: Customer = {
      id: `cust-${Date.now()}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      points: 50, // Welcome bonus
      tier: 'bronze',
      totalSpent: 0,
      visits: 0,
      joinedAt: new Date(),
      lastVisit: new Date(),
    };

    setCustomers((prev) => [...prev, customer]);
    setNewCustomer({ name: '', email: '', phone: '' });
    setIsAddModalOpen(false);

    toast({
      title: 'Customer Added',
      description: `${customer.name} joined with 50 welcome points!`,
    });
  };

  const handleRedeemReward = (reward: LoyaltyReward) => {
    if (!selectedCustomer) return;

    if (selectedCustomer.points < reward.pointsCost) {
      toast({ title: 'Not enough points', variant: 'destructive' });
      return;
    }

    const newPoints = selectedCustomer.points - reward.pointsCost;
    const newTier = calculateTier(newPoints);

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id ? { ...c, points: newPoints, tier: newTier } : c
      )
    );

    setSelectedCustomer({ ...selectedCustomer, points: newPoints, tier: newTier });

    toast({
      title: 'Reward Redeemed!',
      description: `${reward.name} for ${selectedCustomer.name}`,
    });
  };

  const handleAddPoints = (amount: number) => {
    if (!selectedCustomer) return;

    const newPoints = selectedCustomer.points + amount;
    const newTier = calculateTier(newPoints);

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomer.id ? { ...c, points: newPoints, tier: newTier } : c
      )
    );

    setSelectedCustomer({ ...selectedCustomer, points: newPoints, tier: newTier });

    toast({
      title: 'Points Added',
      description: `+${amount} points for ${selectedCustomer.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to POS
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Loyalty Program</h1>
              <p className="text-sm text-muted-foreground">Manage customer rewards</p>
            </div>
          </div>
          
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Members</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalMembers}</p>
          </div>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full ${loyaltyTiers.bronze.color}`} />
              <span className="text-sm text-muted-foreground">Bronze</span>
            </div>
            <p className="text-2xl font-bold">{stats.bronze}</p>
          </div>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full ${loyaltyTiers.silver.color}`} />
              <span className="text-sm text-muted-foreground">Silver</span>
            </div>
            <p className="text-2xl font-bold">{stats.silver}</p>
          </div>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full ${loyaltyTiers.gold.color}`} />
              <span className="text-sm text-muted-foreground">Gold</span>
            </div>
            <p className="text-2xl font-bold">{stats.gold}</p>
          </div>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 rounded-full ${loyaltyTiers.platinum.color}`} />
              <span className="text-sm text-muted-foreground">Platinum</span>
            </div>
            <p className="text-2xl font-bold">{stats.platinum}</p>
          </div>
          
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Total Points</span>
            </div>
            <p className="text-2xl font-bold font-mono">{stats.totalPoints.toLocaleString()}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => {
                setSelectedCustomer(customer);
                setIsRewardModalOpen(true);
              }}
              className="bg-card rounded-xl p-5 border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${loyaltyTiers[customer.tier].color} flex items-center justify-center text-white`}>
                    {getTierIcon(customer.tier)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{customer.tier} Member</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold font-mono text-primary">{customer.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">£{customer.totalSpent.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{customer.visits} visits</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Customer Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                placeholder="+44 7700 900000"
              />
            </div>
            <div className="bg-muted rounded-lg p-3 text-sm">
              <Gift className="w-4 h-4 inline mr-2 text-primary" />
              New members receive <strong>50 welcome points</strong>!
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Rewards Modal */}
      <Dialog open={isRewardModalOpen} onOpenChange={setIsRewardModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedCustomer && (
                <>
                  <div className={`w-10 h-10 rounded-full ${loyaltyTiers[selectedCustomer.tier].color} flex items-center justify-center text-white`}>
                    {getTierIcon(selectedCustomer.tier)}
                  </div>
                  <div>
                    <span>{selectedCustomer.name}</span>
                    <p className="text-sm font-normal text-muted-foreground capitalize">
                      {selectedCustomer.tier} • {selectedCustomer.points} points
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleAddPoints(10)}>
                  +10 pts
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAddPoints(25)}>
                  +25 pts
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAddPoints(50)}>
                  +50 pts
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAddPoints(100)}>
                  +100 pts
                </Button>
              </div>

              {/* Available Rewards */}
              <div>
                <h4 className="font-semibold mb-3">Redeem Rewards</h4>
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {loyaltyRewards.map((reward) => {
                      const canAfford = selectedCustomer.points >= reward.pointsCost;
                      return (
                        <div
                          key={reward.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            canAfford ? 'border-border bg-card' : 'border-border/50 bg-muted/50 opacity-60'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{reward.name}</p>
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm">{reward.pointsCost} pts</span>
                            <Button
                              size="sm"
                              disabled={!canAfford}
                              onClick={() => handleRedeemReward(reward)}
                            >
                              Redeem
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-bold font-mono">£{selectedCustomer.totalSpent.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold font-mono">{selectedCustomer.visits}</p>
                  <p className="text-xs text-muted-foreground">Visits</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold font-mono">
                    {selectedCustomer.lastVisit.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                  <p className="text-xs text-muted-foreground">Last Visit</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoyaltyPage;
