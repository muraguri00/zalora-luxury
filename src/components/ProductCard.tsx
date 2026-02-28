import { Product } from "@/data/products";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group cursor-pointer">
      {/* Image container - 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] overflow-hidden border border-transparent bg-secondary transition-all duration-500 group-hover:border-accent/50">
        <img
          src={imgError ? "/placeholder.svg" : product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
        />

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Sparkles icon on hover */}
        <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Sparkles className="mx-auto h-5 w-5 text-accent" />
        </div>

        {/* Gold corner accent on hover */}
        <div className="absolute right-0 top-0 h-12 w-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute right-0 top-0 h-full w-[2px] bg-accent" />
          <div className="absolute right-0 top-0 h-[2px] w-full bg-accent" />
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
        {/* Brand badge */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
            {product.brand}
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-display text-lg font-normal tracking-wide text-foreground line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-sans text-lg font-light tracking-wider text-foreground">
            ${product.price.toLocaleString()}
          </span>
          <span className="font-sans text-[10px] tracking-wider text-muted-foreground">
            USD
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="font-sans text-xs text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <span className="font-sans text-xs text-accent">★ {product.rating}</span>
            {product.ratingCount && (
              <span className="font-sans text-[10px] text-muted-foreground">
                ({product.ratingCount.toLocaleString()})
              </span>
            )}
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          className="flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-3 font-sans text-[11px] font-medium tracking-[0.15em] text-primary-foreground transition-all duration-500 hover:border-accent hover:shadow-gold-sm hover:gold-gradient hover:text-primary"
        >
          <span>ADD TO CART</span>
          <Sparkles className="h-3.5 w-3.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
