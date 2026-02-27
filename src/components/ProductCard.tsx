import { Product } from "@/data/products";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 flex items-end justify-center bg-primary/5 pb-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => onAddToCart?.(product)}
            className="flex items-center gap-2 bg-primary px-8 py-3 font-body text-xs uppercase tracking-luxury text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Bag
          </button>
        </div>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute right-4 top-4 p-2 transition-colors"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted ? "fill-accent text-accent" : "text-foreground/40"
            }`}
          />
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <p className="font-body text-xs uppercase tracking-wide-luxury text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="font-display text-lg font-medium text-foreground">
          {product.name}
        </h3>
        <p className="font-body text-sm text-foreground">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
