# SpendWise

> Budget-first expense tracker with per-category limits, real-time spend analytics, and visual progress tracking.

![Tests](https://img.shields.io/badge/tests-16%20passed-success?style=flat-square&logo=vitest)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Live Demo](https://img.shields.io/badge/demo-online-brightgreen?style=flat-square&logo=vercel)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)

---

## 🔗 Demo

🌐 **Live Web Application**: [https://spendwise-liard-pi.vercel.app/](https://spendwise-liard-pi.vercel.app/)

![SpendWise Dashboard Overview](public/dashboard.png)

---

## ✨ Features

- **Category Budgeting**: Create and manage target monthly spending limits with custom category icons.
- **Live Visual Analytics**: Monitor category spending against target limits with real-time interactive bar charts.
- **Instant Expense Logging**: Quickly log transactions with title, amount, auto-formatted date, and category assignment.
- **Visual Progress Tracking**: Track spending percentage per budget category with progress indicators to spot overspending early.
- **Full Record Control**: Edit target budget limits or delete individual expense entries anytime in a single click.
- **Indian Rupee Formatting**: Built-in `en-IN` currency formatting (`₹`) across all budgets and transactions.
- **Mobile-Optimized Design**: Manage finances seamlessly across devices with responsive slide-out menus and scrollable data tables.
- **User Ownership Protection**: Ownership checks enforced on every server action and verified with unit tests.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Base UI](https://base-ui.com/), [Lucide Icons](https://lucide.dev/) |
| **Database & ORM** | [Neon PostgreSQL Serverless](https://neon.tech/) & [Drizzle ORM](https://orm.drizzle.team/) |
| **Authentication** | [Clerk Auth (`@clerk/nextjs`)](https://clerk.com/) |
| **Data Viz & Testing** | [Recharts](https://recharts.org/) & [Vitest](https://vitest.dev/) (16/16 Passed) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.9.0 or higher
- **npm**: v10.0.0 or higher
- **Database**: PostgreSQL database instance (e.g. [Neon PostgreSQL](https://neon.tech/))

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashutoshshelar2409-prog/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Clerk authentication keys (obtained from your [Clerk Dashboard](https://dashboard.clerk.com/)) and Neon connection string (from your [Neon Console](https://console.neon.tech/)) in `.env.local` (see [Environment Variables](#-environment-variables)).

4. **Push database schema**:
   ```bash
   npm run db:push
   ```

5. **Run tests to verify setup**:
   ```bash
   npm test
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

The application relies on the configuration structure in [`.env.example`](.env.example). Create a `.env.local` file with appropriate values:

```env
# Clerk Authentication Configuration (from https://dashboard.clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_sample_key
CLERK_SECRET_KEY=sk_test_sample_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Server-Only Database Connection URL (from https://console.neon.tech/)
DATABASE_URL=postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## 📁 Project Structure

```text
expense-tracker/
├── actions/                 # Next.js Server Actions for budgets & expenses with ownership checks
├── app/                     # App Router pages, auth routes, and protected dashboard layouts
├── components/              # Reusable UI components, header, and mobile navigation drawer
├── lib/                     # Utility functions and classname merging helpers
├── public/                  # Static media assets and app screenshots
├── test/                    # Automated Vitest unit test suite (16 passing tests)
├── utils/                   # Database client connection and Drizzle table schemas
└── proxy.ts                 # Next.js authentication route middleware
```

---

## 💡 Decisions & Challenges

- **Server Actions with Ownership Verification**: Opted for Next.js Server Actions with strict `auth()` email verification on every request. Every query and mutation validates ownership (`createdBy = email`), backed by 16 unit tests.
- **Relational Serverless ORM**: Used Drizzle ORM with Neon PostgreSQL to deliver type-safe database access and streamlined schema updates.
- **Avoiding N+1 Queries**: Aggregated total spending and item counts per budget in a single SQL query using `LEFT JOIN` and `GROUP BY`, avoiding separate database roundtrips for each category card.

---

## 🗺️ Roadmap & Future Enhancements

- [ ] 📄 Export transactions to CSV and PDF format.
- [ ] 🔄 Recurring monthly budget resets and historical month comparisons.
- [ ] 💱 Multi-currency support (`$`, `€`, `₹`) alongside default INR.

---

## 📜 License & Contact

- **License**: Distributed under the [MIT License](LICENSE).
- **Author**: Ashutosh Shelar
- **Live Application**: [https://spendwise-liard-pi.vercel.app/](https://spendwise-liard-pi.vercel.app/)
