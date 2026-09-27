# 💰 Smart Expense Tracker

A full-stack, mobile-friendly **Expense Tracker Application** built using **Next.js 16 (App Router)**, **React 19**, **Clerk Authentication**, **Drizzle ORM**, **Neon PostgreSQL Database**, **Tailwind CSS v4**, **Vitest**, and **Recharts**.

Designed with responsive layouts, real-time spending progress bars, Indian Rupee (`₹`) formatting, interactive bar chart analytics, emoji budget customization, modal dialogs, and instant toast notifications.

---

## ✨ Features

- 🔐 **Authentication & Security Protection**: User sign-in & sign-up powered by Clerk with server-side route protection via Next.js `proxy.ts`. Server-only environment variables protect database credentials.
- 🛡️ **Server-Verified Identity & Ownership Enforcement**: All database operations run through Next.js Server Actions with strict ownership validation (`createdBy` checks) preventing cross-user data access or deletion.
- 🧪 **Comprehensive Automated Test Suite**: Includes **16/16 passing unit tests** verifying authentication gating, input validation, server identity tagging, and authorization rules.
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
| **Testing Framework** | [Vitest](https://vitest.dev/) (16/16 Unit Tests Passed) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/) |
| **UI Components & Toasts** | [@base-ui/react](https://base-ui.com/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Emoji Selector** | [emoji-picker-react](https://github.com/ealush/emoji-picker-react) |

---

## 🧪 Automated Testing Suite

This application includes a complete unit testing suite using **Vitest** with database and authentication mocking to ensure zero security regressions and continuous integration stability.

### Test Coverage Highlights (16/16 Passing):
- 🔒 **Authentication Gating**: Asserts that unauthenticated requests (`userId: null`) are rejected before reaching database queries.
- 🛡️ **Ownership Enforcement**: Verifies that budget/expense updates and deletions fail when trying to target resources owned by another user.
- 🔑 **Server-Verified Identity**: Asserts that created budgets/expenses are tagged with the server-verified session email, ignoring client payload tampering.
- 🗑️ **Cascade Deletion Order**: Ensures child expenses are deleted before budget records to respect relational foreign key integrity.
- 🧩 **Pure Utility Verification**: Validates className merging (`cn`) helper functions.

Run the test suite locally:
```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

Output:
```text
✓ test/lib/utils.test.js (3 tests)
✓ test/actions/budgets.test.js (7 tests)
✓ test/actions/expenses.test.js (6 tests)

Test Files  3 passed (3)
     Tests  16 passed (16)
```

---

## 📁 Application Structure & Routes

```text
expense-tracker/
├── actions/                 # Next.js Server Actions (budgets.js, expenses.js)
├── app/                     # App router pages & layouts
│   ├── (auth)/              # Clerk Sign-in & Sign-up routes
│   └── (routes)/dashboard/  # Protected dashboard layout & pages
├── test/                    # Vitest unit test suite (16 tests)
│   ├── actions/             # Server Action security & ownership tests
│   ├── helpers/             # Drizzle query chain mock helper
│   └── lib/                 # Utility tests
├── utils/                   # Database configuration & Drizzle schema
├── proxy.ts                 # Next.js 16 Clerk middleware
└── vitest.config.mjs        # Vitest configuration
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
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Server-Only Neon Database Connection String (DO NOT use NEXT_PUBLIC_ prefix)
DATABASE_URL=postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
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

3. **Run Unit Tests**:
   ```bash
   npm test
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 📝 Change Log & Project Documentation

For a complete record of security audits, architectural decisions, and bug fixes, see [`SECURITY.md`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/FINAL/S.E.T/expense-tracker/SECURITY.md) and [`ashu.md`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/FINAL/S.E.T/expense-tracker/ashu.md).
