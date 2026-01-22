import { Plus } from 'lucide-react';
import { Product, getCategoryIcon } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  const isLowStock = product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <button
      onClick={() => !isOutOfStock && onAdd(product)}
      disabled={isOutOfStock}
      className={`pos-product-card text-left w-full group relative ${
        isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {/* Category Icon */}
      <div className="text-3xl mb-3">{getCategoryIcon(product.category)}</div>
      
      {/* Product Name */}
      <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2">
        {product.name}
      </h3>
      
      {/* Price */}
      <div className="font-mono font-semibold text-lg text-primary">
        £{product.price.toFixed(2)}
      </div>
      
      {/* Stock Indicator */}
      {isLowStock && !isOutOfStock && (
        <span className="absolute top-2 right-2 text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">
          Low stock
        </span>
      )}
      {isOutOfStock && (
        <span className="absolute top-2 right-2 text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
          Out of stock
        </span>
      )}
      
      {/* Add Button Overlay */}
      {!isOutOfStock && (
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground 
                        flex items-center justify-center opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 shadow-lg">
          <Plus className="w-5 h-5" />
        </div>
      )}
    </button>
  );
};
