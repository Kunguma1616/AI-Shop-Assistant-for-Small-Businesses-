import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartSidebarProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const TAX_RATE = 0.08;

export const CartSidebar = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartSidebarProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-80 lg:w-96 bg-pos-sidebar text-pos-sidebar-foreground flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-pos-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Current Order</h2>
          </div>
          {items.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              {itemCount}
            </span>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1 p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-pos-sidebar-foreground/50">
            <ShoppingCart className="w-12 h-12 mb-3" />
            <p className="text-sm">No items in cart</p>
            <p className="text-xs mt-1">Tap products to add them</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="pos-cart-item animate-fade-in">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-pos-sidebar-foreground/60 font-mono">
                    £{item.price.toFixed(2)} each
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-md bg-pos-sidebar-muted hover:bg-pos-sidebar-border 
                             flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="w-6 text-center font-mono font-semibold">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-md bg-pos-sidebar-muted hover:bg-pos-sidebar-border 
                             flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="w-7 h-7 rounded-md hover:bg-destructive/20 text-destructive
                             flex items-center justify-center transition-colors ml-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="font-mono font-semibold text-sm w-16 text-right">
                  £{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Totals & Actions */}
      <div className="p-4 border-t border-pos-sidebar-border space-y-4">
        {/* Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-pos-sidebar-foreground/70">
            <span>Subtotal</span>
            <span className="font-mono">£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-pos-sidebar-foreground/70">
            <span>Tax (8%)</span>
            <span className="font-mono">£{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-pos-sidebar-border">
            <span>Total</span>
            <span className="font-mono text-primary">£{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="pos-action-button bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Checkout • £{total.toFixed(2)}
          </Button>
          
          {items.length > 0 && (
            <Button
              onClick={onClearCart}
              variant="outline"
              className="w-full border-pos-sidebar-border text-pos-sidebar-foreground 
                       hover:bg-pos-sidebar-muted hover:text-pos-sidebar-foreground"
            >
              Clear Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
