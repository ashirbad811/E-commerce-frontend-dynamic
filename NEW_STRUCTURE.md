# New Project Structure - Admin & User Separation

## Overview

The project has been restructured to provide completely separated Admin and User experiences, similar to major e-commerce platforms like Flipkart and Amazon.

## Folder Structure

```
client/src/
├── admin/                       # Admin Section
│   ├── pages/
│   │   ├── AdminLayout.jsx      # Admin layout wrapper
│   │   ├── AdminDashboard.jsx   # Dashboard with stats
│   │   ├── AdminProducts.jsx    # Product management
│   │   ├── AdminOrders.jsx      # Order management
│   │   └── AdminUsers.jsx       # User management (future)
│   ├── components/
│   │   ├── AdminNavbar.jsx      # Admin top navbar
│   │   ├── AdminSidebar.jsx     # Admin side navigation
│   │   └── ...
│   └── routes/                  # Admin-specific routes
│
├── user/                        # User Section
│   ├── pages/
│   │   ├── Home.jsx             # Home page
│   │   ├── ProductListing.jsx   # Product listing
│   │   ├── Cart.jsx             # Shopping cart
│   │   ├── Checkout.jsx         # Checkout process
│   │   └── UserDashboard.jsx    # User profile & orders
│   ├── components/
│   │   ├── UserNavbar.jsx       # User top navbar
│   │   ├── ProductCard.jsx      # Product card component
│   │   └── ...
│   └── routes/                  # User-specific routes
│
├── pages/                       # Shared pages
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Footer.jsx
│   └── ...
│
├── context/                     # Context providers
│   ├── AuthContext.jsx          # Authentication
│   └── CartContext.jsx          # Shopping cart
│
├── components/                  # Shared components
│   ├── ProtectedRoute.jsx
│   └── ...
│
└── App.jsx                      # Main app with routing
```

## Key Features

### Admin Section (`/admin`)

- **AdminDashboard**: Overview with stats (orders, revenue, products, users)
- **AdminProducts**: Manage products (add, edit, delete)
- **AdminOrders**: Manage customer orders and update status
- **AdminUsers**: View and manage users (future)
- **Admin Navigation**: Sidebar navigation for easy access

### User Section (`/`)

- **Home**: Welcome page with featured products
- **Shop**: Browse all products
- **Product Listing**: View and filter products
- **Cart**: Manage shopping cart
- **Checkout**: Order placement with address management
- **Dashboard**: View orders and profile

## Routing

```
PUBLIC ROUTES:
/login                          → Login page
/register                       → Register page

USER ROUTES (Role: customer):
/                              → Home
/shop                          → Product listing
/product/:id                   → Product details
/cart                          → Shopping cart
/checkout                      → Checkout (protected)
/dashboard                     → User dashboard (protected)

ADMIN ROUTES (Role: admin):
/admin                         → Admin dashboard (protected)
/admin/products                → Product management (protected)
/admin/orders                  → Order management (protected)
/admin/users                   → User management (protected)
```

## Navigation

### User Navbar

Shows when user role is NOT admin. Includes:

- Logo/Brand
- Navigation links (Home, Shop)
- Cart icon with item count
- User menu (Login/Register or Profile/Logout)

### Admin Navbar

Shows when user role is admin. Includes:

- Admin Panel title
- User welcome message
- Logout button

### Admin Sidebar

Shows in admin section with menu:

- Dashboard
- Products
- Orders
- Users
- Analytics

## API Integration

All API calls use the environment variable:

```javascript
${import.meta.env.VITE_API_BASE_URL}
```

**Key Endpoints:**

- `GET /api/products` - Get products
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Add address
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/:id` - Update order status (admin)

## Authentication

Uses **Cookie-based Authentication** with httpOnly cookies:

- Token stored securely in httpOnly cookie
- Automatic persistence on page refresh
- No localStorage/sessionStorage needed
- CORS enabled with credentials support

**Auth Endpoints:**

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout

## Components Organization

### Shared Components

- `ProtectedRoute.jsx` - Route protection logic
- `Footer.jsx` - Footer component

### User Components

- `UserNavbar.jsx` - User navigation
- `ProductCard.jsx` - Product card display

### Admin Components

- `AdminNavbar.jsx` - Admin navigation
- `AdminSidebar.jsx` - Admin sidebar menu

## Context Providers

### AuthContext

- `user` - Current user object
- `login(userData)` - Login function
- `logout()` - Logout function
- `loading` - Loading state

### CartContext

- `cart` - Cart items array
- `addToCart(product, quantity)` - Add item to cart
- `removeFromCart(productId)` - Remove item
- `updateQuantity(productId, quantity)` - Update quantity
- `getTotalPrice()` - Calculate total
- `getTotalItems()` - Count items
- `clearCart()` - Clear cart

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Next Steps

1. Create remaining admin pages:
   - AdminUsers.jsx - User management
   - AdminAnalytics.jsx - Analytics dashboard

2. Add product details page for users

3. Add product search/filter functionality

4. Implement payment gateway integration

5. Add review/rating system

## Migration Notes

Old structure files:

- Old `Home.jsx`, `ProductListing.jsx`, etc. → Moved to `user/pages/`
- Old `ProductCard.jsx`, `Navbar.jsx` → Updated and moved to respective sections
- Old `AdminDashboard.jsx` → Replaced with new admin structure

All API calls updated to use `${import.meta.env.VITE_API_BASE_URL}`
