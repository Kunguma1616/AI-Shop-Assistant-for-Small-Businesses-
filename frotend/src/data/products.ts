export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

export const categories = [
  { id: 'all', name: 'All', icon: '🏪' },
  { id: 'chocolate', name: 'Chocolate', icon: '🍫' },
  { id: 'waffles', name: 'Waffles', icon: '🧇' },
  { id: 'sundaes', name: 'Sundaes', icon: '🍨' },
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'bubble-tea', name: 'Bubble Tea', icon: '🧋' },
];

export const products: Product[] = [
  // Chocolates - £8 each
  { id: 'choc-1', name: 'Strawberry Milk Chocolate', price: 8, category: 'chocolate', stock: 50 },
  { id: 'choc-2', name: 'Strawberry White Chocolate', price: 8, category: 'chocolate', stock: 45 },
  { id: 'choc-3', name: 'Classic Milk Chocolate', price: 8, category: 'chocolate', stock: 60 },
  { id: 'choc-4', name: 'Belgian Dark Chocolate', price: 8, category: 'chocolate', stock: 40 },
  
  // Waffles - £9 each
  { id: 'waff-1', name: 'Oreo Waffle', price: 9, category: 'waffles', stock: 35 },
  { id: 'waff-2', name: 'Caramel Waffle', price: 9, category: 'waffles', stock: 30 },
  { id: 'waff-3', name: 'Chocolate & Ice Cream Waffle', price: 9, category: 'waffles', stock: 28 },
  { id: 'waff-4', name: 'Milk & White Choc Sprinkles Waffle', price: 9, category: 'waffles', stock: 25 },
  { id: 'waff-5', name: 'Strawberry Double Chocolate Waffle', price: 9, category: 'waffles', stock: 32 },
  { id: 'waff-6', name: 'Banana Nutella Waffle', price: 9, category: 'waffles', stock: 20 },
  { id: 'waff-7', name: 'Biscoff Waffle', price: 9, category: 'waffles', stock: 22 },
  
  // Sundaes - £8 each
  { id: 'sund-1', name: 'Chocolate Sundae', price: 8, category: 'sundaes', stock: 40 },
  { id: 'sund-2', name: 'Pistachio Sundae', price: 8, category: 'sundaes', stock: 35 },
  { id: 'sund-3', name: 'Strawberry Chocolate Sundae', price: 8, category: 'sundaes', stock: 38 },
  { id: 'sund-4', name: 'Caramel Sundae', price: 8, category: 'sundaes', stock: 42 },
  { id: 'sund-5', name: 'Biscoff Sundae', price: 8, category: 'sundaes', stock: 30 },
  { id: 'sund-6', name: 'Sprinkle Sundae', price: 8, category: 'sundaes', stock: 28 },
  { id: 'sund-7', name: 'Banana Sundae', price: 8, category: 'sundaes', stock: 33 },
  
  // Coffee
  { id: 'coff-1', name: 'Espresso', price: 2.50, category: 'coffee', stock: 100 },
  { id: 'coff-2', name: 'Americano', price: 3, category: 'coffee', stock: 100 },
  { id: 'coff-3', name: 'Cappuccino', price: 3.50, category: 'coffee', stock: 90 },
  { id: 'coff-4', name: 'Latte', price: 3.50, category: 'coffee', stock: 95 },
  { id: 'coff-5', name: 'Flat White', price: 3.50, category: 'coffee', stock: 85 },
  { id: 'coff-6', name: 'Mocha', price: 4, category: 'coffee', stock: 80 },
  { id: 'coff-7', name: 'Caramel Macchiato', price: 4.50, category: 'coffee', stock: 75 },
  { id: 'coff-8', name: 'Iced Latte', price: 4, category: 'coffee', stock: 70 },
  { id: 'coff-9', name: 'Iced Americano', price: 3.50, category: 'coffee', stock: 65 },
  { id: 'coff-10', name: 'Hot Chocolate', price: 3.50, category: 'coffee', stock: 88 },
  
  // Drinks
  { id: 'drink-1', name: 'Fresh Orange Juice', price: 3.50, category: 'drinks', stock: 50 },
  { id: 'drink-2', name: 'Apple Juice', price: 3, category: 'drinks', stock: 55 },
  { id: 'drink-3', name: 'Mango Smoothie', price: 4.50, category: 'drinks', stock: 40 },
  { id: 'drink-4', name: 'Strawberry Smoothie', price: 4.50, category: 'drinks', stock: 45 },
  { id: 'drink-5', name: 'Banana Smoothie', price: 4.50, category: 'drinks', stock: 42 },
  { id: 'drink-6', name: 'Lemonade', price: 3, category: 'drinks', stock: 60 },
  { id: 'drink-7', name: 'Iced Tea', price: 3, category: 'drinks', stock: 58 },
  { id: 'drink-8', name: 'Sparkling Water', price: 2, category: 'drinks', stock: 80 },
  { id: 'drink-9', name: 'Still Water', price: 1.50, category: 'drinks', stock: 100 },
  
  // Bubble Tea
  { id: 'boba-1', name: 'Classic Milk Tea', price: 5, category: 'bubble-tea', stock: 45 },
  { id: 'boba-2', name: 'Taro Milk Tea', price: 5.50, category: 'bubble-tea', stock: 40 },
  { id: 'boba-3', name: 'Brown Sugar Milk Tea', price: 5.50, category: 'bubble-tea', stock: 38 },
  { id: 'boba-4', name: 'Matcha Milk Tea', price: 5.50, category: 'bubble-tea', stock: 35 },
  { id: 'boba-5', name: 'Strawberry Milk Tea', price: 5.50, category: 'bubble-tea', stock: 42 },
  { id: 'boba-6', name: 'Mango Green Tea', price: 5, category: 'bubble-tea', stock: 48 },
  { id: 'boba-7', name: 'Passion Fruit Tea', price: 5, category: 'bubble-tea', stock: 44 },
  { id: 'boba-8', name: 'Peach Oolong Tea', price: 5.50, category: 'bubble-tea', stock: 36 },
  { id: 'boba-9', name: 'Thai Milk Tea', price: 5.50, category: 'bubble-tea', stock: 32 },
  { id: 'boba-10', name: 'Honeydew Milk Tea', price: 5.50, category: 'bubble-tea', stock: 30 },
];

export const getCategoryIcon = (categoryId: string): string => {
  const category = categories.find(c => c.id === categoryId);
  return category?.icon || '🏪';
};

export const getCategoryColor = (categoryId: string): string => {
  const colors: Record<string, string> = {
    'chocolate': 'bg-amber-600',
    'waffles': 'bg-orange-500',
    'sundaes': 'bg-pink-500',
    'coffee': 'bg-amber-700',
    'drinks': 'bg-blue-500',
    'bubble-tea': 'bg-teal-500',
  };
  return colors[categoryId] || 'bg-primary';
};
