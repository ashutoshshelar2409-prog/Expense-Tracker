# 💰 Smart Expense Tracker

A full-stack, mobile-friendly **Expense Tracker Application** built using **Next.js 16 (App Router)**, **React 19**, **Clerk Authentication**, **Drizzle ORM**, **Neon PostgreSQL Database**, **Tailwind CSS v4**, and **Recharts**.

Designed with responsive layouts, real-time spending progress bars, Indian Rupee (`₹`) formatting, interactive bar chart analytics, emoji budget customization, modal dialogs, and instant toast notifications.

---

## ✨ Features

- 🔐 **Authentication & Protection**: User sign-in & sign-up powered by Clerk with route protection via Next.js `proxy.ts`.
- 📱 **100% Mobile Responsive Layout**:
  - Slide-out mobile drawer navigation overlay with auto-close on link selection.
  - Horizontally scrollable data tables (`overflow-x-auto`) for small viewports.
  - Adaptive container paddings (`p-4 sm:p-6 md:p-8/10`) for optimal mobile layout fit.
- 📊 **Interactive Dashboard Analytics**:
  - Summary metrics for **Total Budget**, **Total Spend**, and **No. of Active Budgets**.
  - Interactive **Recharts Bar Chart** visualizing Total Spend vs. Budget Limit per category.
  - Recent Expenses table with edit and single-click deletion.
  - Animated skeleton loaders while fetching data.
- 💡 **Budget Management**:
  - Create, edit, and delete category budgets with customizable target limits.
  - Emoji picker (`emoji-picker-react`) for custom category icons.
  - Spending progress bar with real-time percentage indicators.
- 💸 **Expense Management**:
  - Add expenses categorized under specific budgets with auto-formatted dates.
  - Single-click edit expense title & amount via Base UI modal dialogs.
  - Dedicated expense overview page listing all user expenses across all budgets with budget category tags.
- 🇮🇳 **Indian Rupee (`₹`) Formatting**: Built-in currency formatting (`en-IN`) for budgets and expense entries.
- 💎 **Upgrade Tier Page**: Pro membership tier preview card detailing available features.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Auth Provider** | [@clerk/nextjs](https://clerk.com/) |
| **Database** | [Neon PostgreSQL Serverless](https://neon.tech/) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/) |
| **UI Components & Toasts** | [@base-ui/react](https://base-ui.com/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Emoji Selector** | [emoji-picker-react](https://github.com/ealush/emoji-picker-react) |

---

## 📁 Application Structure & Routes

```text
app/
├── (auth)/                  # Clerk Sign-in & Sign-up split-screen layout
│   ├── sign-in/             # Catch-all sign-in route
│   └── sign-up/             # Catch-all sign-up route
├── (routes)/
│   └── dashboard/           # Protected dashboard layout & pages
│       ├── _components/     # Dashboard Header, Mobile SlideNav, CardInfo, BarChart, ExpenseListTable
│       ├── budgets/         # Budget listing, creation, and item cards
│       ├── expenses/        # All expenses overview page & budget-specific expenses [id]
│       └── upgrade/         # Pro plan upgrade preview page
├── _components/             # Landing page Header & Hero CTA
├── globals.css              # Global styles & Tailwind configuration
├── layout.js                # Root layout with ClerkProvider & Toast notifications
└── page.js                  # Landing page
```

---

## 🔑 Environment Variables Setup

Create a `.env.local` file in the root directory and add the following keys:

```env
# Clerk Authentication Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Neon Database Connection String
DATABASE_URL=postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_DATABASE_URL=postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Push Database Schema**:
   Push the Drizzle ORM schema to your Neon PostgreSQL database:
   ```bash
   npm run db:push
   ```

3. **Open Drizzle Studio (Optional)**:
   Inspect database tables and records visually:
   ```bash
   npm run db:studio
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   *Note: The dev script is configured with `-H 0.0.0.0` allowing local network access from mobile devices connected to the same Wi-Fi network at `http://<YOUR_LOCAL_IP>:3000`.*

5. **Build Production Bundle**:
   ```bash
   npm run build
   ```

6. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 📝 Change Log & Project Documentation

For a complete record of all architecture decisions, bug fixes, console error mitigations, database migrations, and feature updates, see [`ashu.md`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/FINAL/S.E.T/expense-tracker/ashu.md).

## Helper

@Tubeguruji[youtube]

### progress ###

upgrade is not functionable just added for show 