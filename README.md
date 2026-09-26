# NEXORA | Luxury E-Commerce Platform

A commercial-grade, modern, premium e-commerce application built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router DOM**.

---

## ✨ Features Overview

### 🎨 Design & Aesthetics
- **Luxury Visual Identity**: Tailored color palette, glassmorphism headers, subtle glows, and clean rounded card layouts (`rounded-2xl` & `rounded-3xl`).
- **Dark & Light Mode**: Smooth theme toggling persisted to `localStorage`.
- **Micro-Animations & Motion**: Hover card zoom, floating hero badges, button micro-interactions, and celebratory checkout confetti.
- **Modern Typography**: Inter and Plus Jakarta Sans for crisp, editorial legibility.
- **Interactive Toasts**: Floating animated notifications for cart additions, wishlist updates, and promotional codes.

### 📱 Pages & Core Flows

1. **Home (`/`)**:
   - High-impact Hero section with luxury tech showcase, stats counters, and dual CTAs.
   - Featured category cards with zoom hover effects.
   - Trending products & Best sellers showcase.
   - Limited-time promotional flash sale with a live countdown timer.
   - Customer testimonials and verified buyer reviews.
   - Value propositions bar (Free shipping, 30-day returns, authenticity guarantee).
   - Newsletter subscription form with toast feedback.

2. **Shop Catalog (`/shop`)**:
   - Dynamic product search with URL sync (`?search=...`).
   - Category filtering (`?category=...`) across all 7 categories.
   - Price range slider with quick preset buttons (Under $100, $100-$250, $250-$500, $500+).
   - Minimum rating filter and in-stock / on-sale toggles.
   - Live sorting (Featured, Trending, New Arrivals, Best Sellers, Price: Low to High, Price: High to Low, Highest Rated).
   - Removable active filter chips.
   - Responsive sidebar + mobile slide-over filter drawer.
   - Dynamic 3-column / 4-column layout switcher.

3. **Product Details (`/product/:id`)**:
   - Interactive multi-image gallery with thumbnail switcher.
   - Breadcrumb navigation.
   - Stock status indicators, star ratings, and review counts.
   - Price, discount, and computed dollar savings.
   - Interactive quantity controls.
   - Quick "Add to Cart", "Instant Buy Now", and "Wishlist" buttons.
   - Tabbed content: **Overview**, **Technical Specifications**, and **Client Reviews** with form to submit new reviews.
   - Curated related products section.

4. **Shopping Cart (`/cart`)**:
   - Line items with product thumbnail, category, unit price, quantity increment/decrement, and deletion.
   - Free shipping dynamic progress bar (unlocks free shipping at $150).
   - Shipping speed selector (Standard, Priority Express Air, Overnight VIP).
   - Promo code redemption (`NEXORA20` for 20% off, `WELCOME10` for 10% off, `SAVE50` for $50 off).
   - Order financial breakdown with real-time tax and shipping calculations.

5. **Checkout (`/checkout`)**:
   - 3-step checkout experience:
     1. Contact Information
     2. Shipping Destination with delivery options
     3. Payment Method selector (Interactive luxury credit card preview, Apple Pay, PayPal, Cash on Delivery).
   - Real-time card preview updating cardholder name and expiry date.
   - Sticky summary sidebar.
   - Place Order button with animated loading state and confetti completion.

6. **Order Success (`/order-success`)**:
   - Celebratory confetti and verified order checkmark.
   - Unique generated Order ID (e.g. `#NX-94218`).
   - Visual consignment milestone tracker (Placed → Preparing → In Transit → Delivered).
   - Full order summary, items breakdown, and delivery address.
   - Direct shortcuts to continue shopping or view order in dashboard.

7. **Saved Wishlist (`/wishlist`)**:
   - Grid of saved products with persistence in `localStorage`.
   - 1-click "Add All to Cart" action.
   - Empty state with direct link to explore catalog.

8. **Authentication (`/login` & `/register`)**:
   - Modern glassmorphism authentication card.
   - **1-Click VIP Demo Login button** for immediate client demonstration without typing credentials.
   - Social login triggers (Google, Apple, GitHub).
   - Password reset modal with dispatch notifications.
   - Full registration form with password confirmation.

9. **User VIP Dashboard (`/dashboard`)**:
   - **Profile Details**: Editable user credentials, avatar, and VIP tier badge.
   - **Order History**: List of past orders with tracking numbers, status badges, and item details modal.
   - **Saved Wishlist**: Quick access to saved items.
   - **Shipping Destinations**: Manage multiple addresses, set default shipping destination, or add new addresses.
   - **Account Settings**: Theme selection and notification preferences.

---

## 🛠️ Project Structure

```
Nexora/
├── public/
│   └── favicon.svg             # Custom geometric brand logo
├── src/
│   ├── components/
│   │   ├── CartItem/           # Cart item row with quantity adjustment
│   │   ├── CategoryCard/       # Category card with hover zoom & count
│   │   ├── FilterSidebar/      # Desktop sidebar & mobile drawer filters
│   │   ├── Footer/             # Brand footer, links, newsletter, payment cards
│   │   ├── Hero/               # High-impact hero section with showcase card
│   │   ├── Navbar/             # Sticky glassmorphism nav with live counters
│   │   ├── OrderSummary/       # Summary card with coupon, tax, shipping bar
│   │   ├── ProductCard/        # Product card with hover actions & badges
│   │   ├── ProductGrid/        # Responsive grid with skeletons & empty states
│   │   ├── QuickViewModal/     # Modal for quick product previews
│   │   ├── ScrollToTop.jsx     # Scrolls window to top on route change
│   │   └── SearchBar/          # Live autocomplete search bar
│   ├── context/
│   │   ├── AuthContext.jsx     # User authentication, orders & addresses
│   │   ├── CartContext.jsx     # Bag state, quantities, coupons, totals
│   │   ├── ThemeContext.jsx    # Light / dark theme toggle
│   │   ├── ToastContext.jsx    # Floating animated toast notifications
│   │   └── WishlistContext.jsx # Wishlist items & persistence
│   ├── data/
│   │   └── products.js         # 24 realistic products across 7 categories
│   ├── pages/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── NotFound/
│   │   ├── OrderSuccess/
│   │   ├── ProductDetails/
│   │   ├── Register/
│   │   └── Shop/
│   ├── App.jsx                 # Provider wrapper & Route definitions
│   ├── index.css               # Tailwind directives, fonts, glassmorphism
│   └── main.jsx                # React DOM root entrypoint
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🔑 Demo Account & Coupons

- **Preloaded VIP Account**:
  - Name: **Alexander Wright**
  - Email: `alexander.wright@nexora.io`
  - Tier: **Diamond VIP Member**
  - Or use the **"1-Click Sign In"** button on the Login page!
- **Active Promotional Codes**:
  - `NEXORA20` — 20% discount on order total
  - `WELCOME10` — 10% welcome gift
  - `SAVE50` — $50 off orders over $200
