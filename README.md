# Foodio User (Frontend)

A sleek, premium, and responsive food ordering experience. Built with Next.js and designed for visual excellence.

## 🚀 Live Demo

- **Website**: https://foodio-user-siyan.vercel.app/

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS & ShadCN
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) (Toast notifications)
- **Deployment**: Vercel

## ✨ Key Features

- **Premium Design**: Modern, glassmorphic UI with vibrant HSL color palettes and smooth gradients.
- **Dynamic Menu**: Real-time menu updates featuring categorized showcases.
- **Seamless Ordering**: Integrated order modal with quantity management.
- **Live Order Tracking**: Dynamic polling for real-time order status updates.
- **Developer Shortcut**: `Ctrl + A` global shortcut to instantly navigate to the Admin Dashboard (environment-configured).
- **Responsive Layout**: Pixel-perfect performance across mobile, tablet, and desktop.
- **Form Validation**: Secure authentication flows with interactive feedback.

## 📂 Components

- `src/components/CategoryShowcase`: Dynamic category filter and live menu fetcher.
- `src/components/MenuCard`: Interactive product card with order integration.
- `src/app/orders`: Real-time order monitoring dashboard.
- `src/app/auth`: Optimized Sign-in and Registration with Suspense boundaries.

## ⚙️ Installation & Setup (Local)

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Configure Environment Variables**:
   Create a `.env` file:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   NEXT_PUBLIC_ADMIN_URL="http://localhost:3001"
   ```
4. **Run Development Server**: `npm run dev`

## 👨‍💻 Developed by

[Intisar_Ahmed_Siyan] - Passionate Full-Stack Developer
