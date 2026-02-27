import { useState } from "react";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "react-router-dom";

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  let filtered = products.filter((p) => {
    const catMatch = selectedCategory === "All" || p.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || p.brand === selectedBrand;
    return catMatch && brandMatch;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="bg-cream px-6 py-20 text-center">
        <p className="font-body text-xs uppercase tracking-luxury text-muted-foreground">
          The Collection
        </p>
        <h1 className="mt-3 font-display text-5xl font-light text-foreground lg:text-6xl">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-accent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
          <div className="flex flex-wrap gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-body text-xs uppercase tracking-luxury transition-colors ${
                  selectedCategory === cat
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="border border-border bg-transparent px-4 py-2 font-body text-xs uppercase tracking-wide text-foreground focus:outline-none"
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-border bg-transparent px-4 py-2 font-body text-xs uppercase tracking-wide text-foreground focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-body text-muted-foreground">
            No products found in this selection.
          </p>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
