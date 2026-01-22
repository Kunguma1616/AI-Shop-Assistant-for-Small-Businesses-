export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  averageOrder: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
}

export interface HourlyData {
  hour: string;
  orders: number;
  revenue: number;
}

export interface CategorySales {
  category: string;
  revenue: number;
  percentage: number;
}

// Generate sample sales data for the last 30 days
export const generateSalesData = (): SalesData[] => {
  const data: SalesData[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseOrders = isWeekend ? 85 : 55;
    const orders = baseOrders + Math.floor(Math.random() * 30);
    const avgOrderValue = 12 + Math.random() * 8;
    const revenue = orders * avgOrderValue;
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.round(revenue * 100) / 100,
      orders,
      averageOrder: Math.round(avgOrderValue * 100) / 100,
    });
  }
  
  return data;
};

export const topProducts: TopProduct[] = [
  { id: 'coff-4', name: 'Latte', category: 'coffee', unitsSold: 342, revenue: 1197.00 },
  { id: 'boba-3', name: 'Brown Sugar Milk Tea', category: 'bubble-tea', unitsSold: 256, revenue: 1408.00 },
  { id: 'waff-3', name: 'Chocolate & Ice Cream Waffle', category: 'waffles', unitsSold: 198, revenue: 1782.00 },
  { id: 'sund-1', name: 'Chocolate Sundae', category: 'sundaes', unitsSold: 187, revenue: 1496.00 },
  { id: 'coff-7', name: 'Caramel Macchiato', category: 'coffee', unitsSold: 176, revenue: 792.00 },
  { id: 'choc-1', name: 'Strawberry Milk Chocolate', category: 'chocolate', unitsSold: 165, revenue: 1320.00 },
  { id: 'boba-2', name: 'Taro Milk Tea', category: 'bubble-tea', unitsSold: 154, revenue: 847.00 },
  { id: 'waff-1', name: 'Oreo Waffle', category: 'waffles', unitsSold: 143, revenue: 1287.00 },
];

export const hourlyData: HourlyData[] = [
  { hour: '8AM', orders: 12, revenue: 145.50 },
  { hour: '9AM', orders: 28, revenue: 336.00 },
  { hour: '10AM', orders: 45, revenue: 567.00 },
  { hour: '11AM', orders: 52, revenue: 689.50 },
  { hour: '12PM', orders: 68, revenue: 884.00 },
  { hour: '1PM', orders: 72, revenue: 936.00 },
  { hour: '2PM', orders: 58, revenue: 725.00 },
  { hour: '3PM', orders: 64, revenue: 832.00 },
  { hour: '4PM', orders: 71, revenue: 923.00 },
  { hour: '5PM', orders: 55, revenue: 687.50 },
  { hour: '6PM', orders: 42, revenue: 525.00 },
  { hour: '7PM', orders: 35, revenue: 437.50 },
  { hour: '8PM', orders: 22, revenue: 275.00 },
];

export const categorySales: CategorySales[] = [
  { category: 'Coffee', revenue: 4250, percentage: 28 },
  { category: 'Bubble Tea', revenue: 3180, percentage: 21 },
  { category: 'Waffles', revenue: 2850, percentage: 19 },
  { category: 'Sundaes', revenue: 2420, percentage: 16 },
  { category: 'Chocolate', revenue: 1560, percentage: 10 },
  { category: 'Drinks', revenue: 890, percentage: 6 },
];

export const salesSummary = {
  todayRevenue: 1456.50,
  todayOrders: 89,
  weekRevenue: 9845.25,
  weekOrders: 612,
  monthRevenue: 38450.75,
  monthOrders: 2456,
  avgOrderValue: 15.65,
  growthRate: 12.5,
};
