# PlatformFlower - Online Flower Shop Frontend

A modern, responsive React-based frontend for an online flower shop built with Ant Design and TypeScript.

## Features

### 🌸 User Features

- **Home Page**: Featured flowers and popular categories showcase
- **Authentication**: Login/Register with JWT token management
- **Flower Browsing**: Search and filter flowers by categories
- **Flower Details**: Detailed product pages with image preview
- **Shopping Cart**: Add/remove items, quantity management
- **User Profile**: Manage personal information
- **Protected Routes**: Role-based access control

### 🛠️ Admin Features

- **Admin Dashboard**: Centralized management interface
- **Flower Management**: Add, edit, delete flowers
- **Category Management**: Organize flower categories
- **Voucher Management**: Create and track promotional codes
- **User Management**: Monitor and manage user accounts
- **Order Management**: Process and track orders

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Interface**: Clean design using Ant Design components
- **Interactive Elements**: Hover effects, transitions, and animations
- **Image Galleries**: Product image carousels and previews
- **Search & Filter**: Real-time search with category filtering
- **Pagination**: Efficient data loading and navigation

## Tech Stack

- **Framework**: React 19.1.0 with TypeScript
- **UI Library**: Ant Design 5.26.1
- **Styling**: Tailwind CSS 4.1.10
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite 6.3.5
- **State Management**: React Context API
- **Authentication**: JWT tokens with localStorage

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── FlowerCard.tsx   # Product card component
│   ├── ProtectedRoute.tsx # Route protection
│   └── AdminSidebar.tsx # Admin navigation
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Login.tsx        # Authentication
│   ├── Register.tsx     # User registration
│   ├── FlowerList.tsx   # Product listing
│   ├── FlowerDetail.tsx # Product details
│   ├── Cart.tsx         # Shopping cart
│   ├── Profile.tsx      # User profile
│   └── admin/           # Admin pages
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state
├── services/            # API integration
│   ├── api.ts           # Axios configuration
│   ├── authService.ts   # Authentication APIs
│   ├── flowerService.ts # Product APIs
│   └── cartService.ts   # Cart APIs
├── hooks/               # Custom React hooks
│   └── useAuth.ts       # Authentication hook
├── types/               # TypeScript definitions
│   └── index.ts         # Type definitions
└── utils/               # Utility functions
```

## Installation & Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication Flow

1. **Login/Register**: User provides credentials
2. **JWT Token**: Server returns JWT token and user data
3. **Storage**: Token stored in localStorage
4. **Auto-login**: Token validated on app initialization
5. **Route Protection**: Protected routes check authentication
6. **Auto-logout**: Invalid tokens trigger automatic logout

## Routes

### Public Routes

- `/` - Home page with featured content
- `/login` - User authentication
- `/register` - New user registration
- `/flowers` - Browse all flowers
- `/flowers/:id` - Flower detail page

### Protected Routes (User)

- `/cart` - Shopping cart management
- `/checkout` - Order checkout process
- `/orders` - Order history
- `/profile` - User profile management
- `/addresses` - Address book

### Admin Routes

- `/admin` - Admin dashboard
- `/admin/flowers` - Manage flowers
- `/admin/categories` - Manage categories
- `/admin/vouchers` - Manage vouchers
- `/admin/users` - User management

## API Integration

The frontend is designed to work with a REST API backend. Key endpoints include:

- Authentication: `/api/auth/login`, `/api/auth/register`
- Flowers: `/api/flowers`, `/api/flowers/{id}`
- Cart: `/api/cart/my-cart`, `/api/cart/add`
- User: `/api/user/profile`, `/api/user/addresses`
- Admin: `/api/admin/*` endpoints

## Features Implemented

✅ **Authentication System**
✅ **Home Page with Hero Section**
✅ **Flower Listing with Search/Filter**
✅ **Flower Detail Pages**
✅ **Shopping Cart Functionality**
✅ **User Profile Management**
✅ **Responsive Navigation**
✅ **Protected Routes**
✅ **Admin Layout Structure**

## Features in Development

🚧 **Order Management**
🚧 **Address Book**
🚧 **Checkout Process**
🚧 **Admin CRUD Operations**
🚧 **Payment Integration**
🚧 **Voucher System**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

Built with ❤️ using React, TypeScript, and Ant Design
