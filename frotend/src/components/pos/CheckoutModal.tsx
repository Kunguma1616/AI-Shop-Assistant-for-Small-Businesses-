import { useState } from 'react';
import { CreditCard, Banknote, CheckCircle2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartSidebar';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onComplete: () => void;
}

type PaymentMethod = 'card' | 'cash' | null;

const TAX_RATE = 0.08;

export const CheckoutModal = ({ open, onClose, items, onComplete }: CheckoutModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleClose = () => {
    if (isComplete) {
      onComplete();
    }
    setPaymentMethod(null);
    setIsProcessing(false);
    setIsComplete(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{isComplete ? 'Payment Complete' : 'Checkout'}</span>
            <button
              onClick={handleClose}
              className="rounded-full p-1 hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogTitle>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center py-8 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4 animate-pulse-success">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground text-center">
              Payment of <span className="font-mono font-semibold">£{total.toFixed(2)}</span> received
            </p>
            <Button onClick={handleClose} className="mt-6 bg-primary hover:bg-primary/90">
              New Order
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items ({items.length})</span>
                <span className="font-mono">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-mono">£{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span className="font-mono text-primary">£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Select Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${paymentMethod === 'card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }`}
                >
                  <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium">Card</span>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                    ${paymentMethod === 'cash' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }`}
                >
                  <Banknote className={`w-8 h-8 ${paymentMethod === 'cash' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium">Cash</span>
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handlePayment}
              disabled={!paymentMethod || isProcessing}
              className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Pay £${total.toFixed(2)}`
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
