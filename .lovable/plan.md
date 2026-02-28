

# Zalora Luxury Platform Redesign + CSV Product Import

## Overview
Complete visual redesign of all pages to match the ultra-luxury black and gold aesthetic specification, plus importing products from the uploaded CSV (1,465 items) into the product catalog.

---

## 1. Design System Updates

**Fonts**: Add Playfair Display and Montserrat alongside existing Cormorant Garamond and Outfit in `index.css`.

**CSS Variables & Utilities**: Update `index.css` with new gold gradient utilities, luxury grid pattern background, corner accent helpers, and updated animation keyframes (fade-in with slide, scale-in, staggered delays).

**Tailwind Config**: Add `serif` (Playfair Display) and `sans` (Montserrat) font families to `tailwind.config.ts`. Add gold-glow shadow utilities.

**Button Variants**: No major changes needed -- existing `gold`, `hero`, `hero-outline` variants cover the spec.

---

## 2. Product Data Import

**Parse CSV** into `src/data/products.ts`:
- The CSV contains ~1,465 Amazon products with fields: SKU, Product_Name, Category, Price (INR), Original_Price, Discount, Rating, Rating_Count, Description, Image_URL
- Create a new expanded `Product` interface adding: `originalPrice`, `discount`, `rating`, `ratingCount`, `imageUrl` (external URL)
- Keep existing 6 luxury mock products as featured/hero items
- Add CSV products as the main catalog (using external image URLs from the CSV)
- Parse category strings (e.g. "Computers&Accessories|Cables") into simplified categories
- Convert INR prices to USD (approximate) or keep as-is with currency indicator
- Extract unique categories and brands for filter options

**Note**: With 1,465 products, the data file will be large. Products will be stored as a static TypeScript array. Pagination will be added to the catalog grid.

---

## 3. Splash Page Redesign

Transform from photo-overlay hero to the black background luxury spec:
- Black background with subtle gold 100px grid pattern (CSS background)
- Crown icon (64px, gold) centered above logo
- "ZALORA" in Playfair Display, very large (text-8xl/9xl), white, 0.3em tracking
- Gold gradient divider line (128px)
- "HAUTE COUTURE & TIMELESS ELEGANCE" tagline in gold
- 3-column image grid with hover scale + gradient overlay + gold borders
- "ENTER BOUTIQUE" button with gold gradient background, animated background-position, gold glow shadow
- Staggered fade-in animations on all elements
- Footer with copyright and links

---

## 4. Navbar / Header Redesign

- Add a top shipping banner bar with sparkle icons and gold tracking text
- Crown icon next to "ZALORA" logo
- Cart badge: gold gradient circle with item count
- Profile and cart icons: hover transforms to gold color
- Sticky with backdrop blur and gold bottom border (20% opacity)

---

## 5. Catalog Page Redesign

- Page title section with crown icon, gold dividers, "Our Collection" heading
- Filter section with gradient background (white to gray-50), gold bordered container
- Category and brand filter buttons with active state: gold gradient background + gold border + gold glow shadow
- 4-column product grid on desktop (3 on medium, 1 on mobile)
- Pagination controls for the large product set
- Email prompt modal overlay (for add-to-cart gating): crown, gold dividers, email input, "CONTINUE SHOPPING" button

---

## 6. ProductCard Redesign

- 3:4 aspect ratio image container
- Hover: image scales 1.1, gradient overlay from black at bottom, sparkles icon appears, gold corner accent (top-right 48x48 border)
- Brand badge with 32px gold line + brand name
- Product name in Cormorant Garamond
- Price with "USD" label
- "ADD TO CART" button: black background, transitions to gold gradient on hover with sparkle icon and gold glow shadow

---

## 7. Profile Page Redesign

- Account information card with gold border, corner gradient decorations, gold shadow
- Cart overview card with dark gradient background (gray-900 to black), gold border, glowing gold orbs
- Store application CTA: large card with 4px gold border, crown icon (72px) with animated sparkle, gold gradient "APPLY FOR A STORE" button with glow

---

## 8. Store Application - Multi-Step Form

Convert from single-page form to 3-step wizard:
- Step 1 (IDENTITY): Selfie, front/back ID, SSN/ID number
- Step 2 (PERSONAL): Date of birth, address, occupation, salary, car ownership
- Step 3 (FINAL): Proof of occupation, terms agreement, submit

Progress bar card:
- "STEP X OF 3" indicator
- Gold gradient fill bar with glow shadow
- Three labeled step indicators with active/inactive states

File upload areas: dashed gold border, gold gradient background, hover transitions.

---

## 9. Store Dashboard & Admin Dashboard

Minor gold accent updates to match the new design system -- primarily border colors, shadow styles, and button styling adjustments. The structural layout remains the same.

---

## Technical Details

### Files to Create
- `src/data/csvProducts.ts` -- Parsed CSV product data (1,465 items)
- `src/components/EmailPromptModal.tsx` -- Cart email gating modal
- `src/components/LuxuryHeader.tsx` -- Reusable black gradient header for store/admin pages

### Files to Modify
- `src/index.css` -- Add Playfair Display + Montserrat fonts, new CSS utilities, grid pattern background
- `tailwind.config.ts` -- Add serif/sans font families
- `src/data/products.ts` -- Expand Product interface, merge CSV data, update categories/brands arrays
- `src/pages/SplashPage.tsx` -- Full redesign to black/gold aesthetic
- `src/components/Navbar.tsx` -- Add shipping banner, crown icon, gold accents
- `src/pages/CatalogPage.tsx` -- 4-col grid, pagination, email modal integration, gold filter styling
- `src/components/ProductCard.tsx` -- Gold accents, corner decorations, enhanced hover effects
- `src/pages/ProfilePage.tsx` -- Gold-themed cards with glow effects
- `src/pages/StoreApplicationPage.tsx` -- Convert to 3-step wizard with progress bar
- `src/pages/StoreDashboardPage.tsx` -- Minor gold accent updates
- `src/pages/AdminDashboardPage.tsx` -- Minor gold accent updates

