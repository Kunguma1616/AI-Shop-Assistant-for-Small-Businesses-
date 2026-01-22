export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  visits: number;
  joinedAt: Date;
  lastVisit: Date;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'free_item' | 'upgrade';
  value: number; // percentage or item id
}

export const loyaltyTiers = {
  bronze: { name: 'Bronze', minPoints: 0, pointsMultiplier: 1, color: 'bg-amber-600' },
  silver: { name: 'Silver', minPoints: 500, pointsMultiplier: 1.25, color: 'bg-slate-400' },
  gold: { name: 'Gold', minPoints: 1500, pointsMultiplier: 1.5, color: 'bg-yellow-500' },
  platinum: { name: 'Platinum', minPoints: 5000, pointsMultiplier: 2, color: 'bg-purple-500' },
};

export const loyaltyRewards: LoyaltyReward[] = [
  { id: 'reward-1', name: 'Free Coffee', description: 'Any regular coffee', pointsCost: 50, type: 'free_item', value: 0 },
  { id: 'reward-2', name: '10% Off', description: '10% off your order', pointsCost: 100, type: 'discount', value: 10 },
  { id: 'reward-3', name: 'Free Waffle', description: 'Any waffle of choice', pointsCost: 150, type: 'free_item', value: 0 },
  { id: 'reward-4', name: '25% Off', description: '25% off your order', pointsCost: 300, type: 'discount', value: 25 },
  { id: 'reward-5', name: 'Free Sundae', description: 'Any sundae of choice', pointsCost: 200, type: 'free_item', value: 0 },
  { id: 'reward-6', name: 'Double Points', description: 'Double points on next visit', pointsCost: 250, type: 'upgrade', value: 2 },
];

export const sampleCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Emma Wilson',
    email: 'emma@email.com',
    phone: '+44 7700 900123',
    points: 1250,
    tier: 'silver',
    totalSpent: 456.50,
    visits: 34,
    joinedAt: new Date('2024-03-15'),
    lastVisit: new Date('2025-01-17'),
  },
  {
    id: 'cust-2',
    name: 'James Smith',
    email: 'james.s@email.com',
    phone: '+44 7700 900456',
    points: 2800,
    tier: 'gold',
    totalSpent: 892.00,
    visits: 67,
    joinedAt: new Date('2023-11-20'),
    lastVisit: new Date('2025-01-18'),
  },
  {
    id: 'cust-3',
    name: 'Sophie Brown',
    email: 'sophie.b@email.com',
    phone: '+44 7700 900789',
    points: 450,
    tier: 'bronze',
    totalSpent: 156.25,
    visits: 12,
    joinedAt: new Date('2024-10-05'),
    lastVisit: new Date('2025-01-15'),
  },
  {
    id: 'cust-4',
    name: 'Oliver Johnson',
    email: 'oliver.j@email.com',
    phone: '+44 7700 900321',
    points: 5600,
    tier: 'platinum',
    totalSpent: 1845.75,
    visits: 145,
    joinedAt: new Date('2023-06-10'),
    lastVisit: new Date('2025-01-18'),
  },
  {
    id: 'cust-5',
    name: 'Amelia Davis',
    email: 'amelia.d@email.com',
    phone: '+44 7700 900654',
    points: 890,
    tier: 'silver',
    totalSpent: 312.00,
    visits: 28,
    joinedAt: new Date('2024-05-22'),
    lastVisit: new Date('2025-01-16'),
  },
];

export const calculateTier = (points: number): Customer['tier'] => {
  if (points >= loyaltyTiers.platinum.minPoints) return 'platinum';
  if (points >= loyaltyTiers.gold.minPoints) return 'gold';
  if (points >= loyaltyTiers.silver.minPoints) return 'silver';
  return 'bronze';
};

export const calculatePointsForPurchase = (amount: number, tier: Customer['tier']): number => {
  const multiplier = loyaltyTiers[tier].pointsMultiplier;
  return Math.floor(amount * multiplier);
};
