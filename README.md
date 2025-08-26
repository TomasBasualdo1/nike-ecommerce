# Nike E-commerce Store

A modern e-commerce application built with Next.js, TypeScript, and a comprehensive tech stack for selling Nike athletic footwear and apparel.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Better Auth with Google OAuth
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **State Management**: Zustand
- **Icons**: Lucide React
- **Linting**: ESLint

## ✨ Features

- 🛍️ **E-commerce Functionality**: Product browsing, cart management, and checkout
- 🔐 **Authentication**: Secure user authentication with Google OAuth
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🗄️ **Database**: PostgreSQL database with Drizzle ORM
- 🎯 **State Management**: Client-side state management with Zustand
- 🔍 **Search & Filter**: Product search and category filtering
- 🛒 **Shopping Cart**: Persistent cart with local storage

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── cart/           # Shopping cart page
│   ├── products/       # Products listing page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable React components
│   ├── Header.tsx      # Navigation header
│   └── ProductCard.tsx # Product display component
└── lib/               # Utility libraries
    ├── auth.ts        # Better Auth configuration
    ├── store.ts       # Zustand store
    └── db/            # Database configuration
        ├── index.ts   # Database connection
        └── schema.ts  # Database schema
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nike-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@host:port/database"

   # Authentication
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate database migrations
   npm run db:generate

   # Push migrations to database
   npm run db:push

   # (Optional) Open Drizzle Studio
   npm run db:studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Using Neon PostgreSQL

1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to your `.env.local` file
4. Run the database migrations

### Database Schema

The application includes the following tables:
- `users` - User accounts and authentication
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Individual items in orders

## 🔐 Authentication Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy the client ID and secret to your `.env.local` file

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push migrations to database
- `npm run db:studio` - Open Drizzle Studio

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying the Tailwind configuration in `tailwind.config.js`
- Updating component styles in the respective `.tsx` files
- Adding custom CSS in `src/app/globals.css`

### Adding Products
To add products to the database:
1. Use Drizzle Studio: `npm run db:studio`
2. Or create API routes for product management
3. Update the sample data in the components

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Drizzle ORM docs](https://orm.drizzle.team)
3. Check the [Better Auth documentation](https://better-auth.com)
4. Open an issue in this repository

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
