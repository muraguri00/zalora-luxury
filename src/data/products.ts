import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  wholesalePrice: number;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "ZLR-001",
    name: "Noir Structured Tote",
    brand: "Maison Zalora",
    price: 2450,
    wholesalePrice: 1960,
    category: "Bags",
    image: product1,
    description: "Hand-stitched Italian leather tote with gold hardware.",
  },
  {
    id: "ZLR-002",
    name: "Aurum Timepiece",
    brand: "Zalora Horlogerie",
    price: 8900,
    wholesalePrice: 7120,
    category: "Watches",
    image: product2,
    description: "18k gold-plated automatic movement wristwatch.",
  },
  {
    id: "ZLR-003",
    name: "Soie Royale Scarf",
    brand: "Maison Zalora",
    price: 680,
    wholesalePrice: 544,
    category: "Accessories",
    image: product3,
    description: "Pure mulberry silk scarf with artisan print.",
  },
  {
    id: "ZLR-004",
    name: "Vermillion Stiletto",
    brand: "Zalora Atelier",
    price: 1200,
    wholesalePrice: 960,
    category: "Shoes",
    image: product4,
    description: "Patent leather stiletto with signature red sole.",
  },
  {
    id: "ZLR-005",
    name: "Heritage Belt",
    brand: "Maison Zalora",
    price: 890,
    wholesalePrice: 712,
    category: "Accessories",
    image: product5,
    description: "Full-grain leather belt with brushed gold buckle.",
  },
  {
    id: "ZLR-006",
    name: "Essence Nº 7",
    brand: "Zalora Parfums",
    price: 320,
    wholesalePrice: 256,
    category: "Fragrance",
    image: product6,
    description: "Eau de parfum with notes of amber, oud, and rose.",
  },
];

export const categories = ["All", "Bags", "Watches", "Accessories", "Shoes", "Fragrance"];
export const brands = ["All", "Maison Zalora", "Zalora Horlogerie", "Zalora Atelier", "Zalora Parfums"];
