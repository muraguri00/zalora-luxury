import { useState } from "react";
import { products, categories, brands } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import EmailPromptModal from "@/components/EmailPromptModal";
import { useSearchParams } from "react-router-dom";
import { Crown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [email, setEmail] = useState("");

  let filtered = products.filter((p) => {
    const catMatch = selectedCategory === "All" || p.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || p.brand === selectedBrand;
    return catMatch && brandMatch;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAddToCart = () => {
    if (!email) {
      setShowEmailPrompt(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Title section */}
      <div className="bg-secondary px-6 py-20 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-accent" />
          <Crown className="h-6 w-6 text-accent" strokeWidth={1.5} />
          <div className="h-px w-12 bg-accent" />
        </div>
        <h1 className="mt-4 font-display text-5xl font-light text-foreground lg:text-7xl">
          {selectedCategory === "All" ? "Our Collection" : selectedCategory}
        </h1>
        <p className="mt-3 font-sans text-xs tracking-luxury text-muted-foreground">
          CURATED EXCELLENCE · {filtered.length} PIECES
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Filters section */}
        <div className="mb-12 border border-accent/20 bg-gradient-to-b from-secondary to-background p-8 md:p-12">
          {/* Categories */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-accent" />
              <span className="font-sans text-xs font-semibold tracking-luxury text-accent">CATEGORY</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                  className={`border px-6 py-2.5 font-sans text-[11px] font-medium tracking-[0.15em] transition-all duration-500 ${
                    selectedCategory === cat
                      ? "border-accent text-accent-foreground shadow-gold-sm gold-gradient"
                      : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Brands & Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="font-sans text-xs font-semibold tracking-luxury text-accent">BRAND</span>
            </div>
            <select
              value={selectedBrand}
              onChange={(e) => { setSelectedBrand(e.target.value); setPage(1); }}
              className="border border-border bg-transparent px-4 py-2 font-sans text-xs tracking-wide text-foreground focus:border-accent focus:outline-none"
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <div className="ml-auto flex items-center gap-3">
              <span className="font-sans text-xs font-semibold tracking-luxury text-accent">SORT</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-border bg-transparent px-4 py-2 font-sans text-xs tracking-wide text-foreground focus:border-accent focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center font-sans text-muted-foreground">
            No products found in this selection.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="border border-border p-3 transition-all hover:border-accent disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`h-10 w-10 font-sans text-xs font-medium tracking-wide transition-all duration-300 ${
                      page === pageNum
                        ? "border border-accent text-accent-foreground gold-gradient"
                        : "border border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 7 && (
                <>
                  <span className="px-2 text-muted-foreground">…</span>
                  <button
                    onClick={() => setPage(totalPages)}
                    className={`h-10 w-10 font-sans text-xs font-medium tracking-wide transition-all duration-300 ${
                      page === totalPages
                        ? "border border-accent text-accent-foreground gold-gradient"
                        : "border border-transparent text-muted-foreground hover:border-border"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="border border-border p-3 transition-all hover:border-accent disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Email modal */}
      <EmailPromptModal
        open={showEmailPrompt}
        onClose={() => setShowEmailPrompt(false)}
        email={email}
        setEmail={setEmail}
        onSubmit={() => setShowEmailPrompt(false)}
      />
    </div>
  );
};

export default CatalogPage;
