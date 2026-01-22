import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Package, Menu, ScanBarcode, BarChart3, Gift } from "lucide-react";

import { products, Product } from "@/data/products";

import { ProductCard } from "@/components/pos/ProductCard";
import { CategoryTabs } from "@/components/pos/CategoryTabs";
import { CartSidebar, CartItem } from "@/components/pos/CartSidebar";
import { CheckoutModal } from "@/components/pos/CheckoutModal";
import { SearchBar } from "@/components/pos/SearchBar";
import { BarcodeScanner } from "@/components/pos/BarcodeScanner";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const POSPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const { toast } = useToast();

  const handleBarcodeScan = (barcode: string) => {
    const product = products.find(
      (p) =>
        p.id === barcode ||
        p.name.toLowerCase().includes(barcode.toLowerCase())
    );

    if (product) {
      addToCart(product);
      toast({
        title: "Product Found",
        description: `${product.name} added to cart`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: `No product found for barcode: ${barcode}`,
        variant: "destructive",
      });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: "Added to cart",
      description: `${product.name} added`,
      duration: 1500,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((i) =>
          i.id === productId ? { ...i, quantity } : i
        )
      );
    }
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const handleCheckoutComplete = () => {
    clearCart();
    toast({
      title: "Order Complete",
      description: "Receipt printed successfully",
      duration: 3000,
    });
  };

  const itemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Main POS Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">☕</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Sweet Treats POS</h1>
              <p className="text-xs text-muted-foreground">
                Point of Sale
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsScannerOpen(true)}
              className="gap-2"
            >
              <ScanBarcode className="w-4 h-4" />
              <span className="hidden sm:inline">Scan</span>
            </Button>

            <Link to="/analytics" className="hidden sm:block">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Button>
            </Link>

            <Link to="/loyalty" className="hidden sm:block">
              <Button variant="outline" size="sm" className="gap-2">
                <Gift className="w-4 h-4" />
                Loyalty
              </Button>
            </Link>

            <Link to="/inventory" className="hidden sm:block">
              <Button variant="outline" size="sm" className="gap-2">
                <Package className="w-4 h-4" />
                Inventory
              </Button>
            </Link>

            {/* Mobile Cart */}
            <Sheet
              open={isMobileCartOpen}
              onOpenChange={setIsMobileCartOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden relative"
                >
                  <Menu className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-96">
                <CartSidebar
                  items={cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onClearCart={clearCart}
                  onCheckout={() => {
                    setIsMobileCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Search + Categories */}
        <div className="px-4 py-4 space-y-4 bg-card border-b border-border">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <p className="text-lg">No products found</p>
              <p className="text-sm">
                Try adjusting search or category
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Cart */}
      <div className="hidden lg:block border-l border-border">
        <CartSidebar
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      </div>

      {/* Modals */}
      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onComplete={handleCheckoutComplete}
      />

      <BarcodeScanner
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleBarcodeScan}
      />
    </div>
  );
};

export default POSPage;
