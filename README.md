# Expense Tracker - Clerk Authentication & HyperUI Sign-In Setup

This project is a Next.js (App Router) Expense Tracker application integrated with [Clerk](https://clerk.com/) for user authentication and styled using [HyperUI](https://www.hyperui.dev/) split-screen components.

---

## Summary of Changes Made

### 1. Created Auth Split-Screen Layout
- **File**: [`app/(auth)/layout.jsx`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/S.E.T/expense-tracker/app/(auth)/layout.jsx)
- **Description**: Implemented a responsive 12-column HyperUI split-screen layout (`lg:grid-cols-12`) shared by all authentication pages:
  - **Left Section (`lg:col-span-5` / `xl:col-span-6`)**: Features a full-height dark background image with gradient overlay, app branding logo, main heading (*"Welcome to Expense Tracker "*), and descriptive tagline.
  - **Right Section (`lg:col-span-7` / `xl:col-span-6`)**: Centered flexbox container housing Clerk's `<SignIn />` or `<SignUp />` form cards.

### 2. Wired Up Sign-In & Sign-Up Routes
- **Files**:
  - [`app/(auth)/sign-in/[[...sign-in]]/page.jsx`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/S.E.T/expense-tracker/app/(auth)/sign-in/[[...sign-in]]/page.jsx)
  - [`app/(auth)/sign-up/[[...sign-up]]/page.jsx`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/S.E.T/expense-tracker/app/(auth)/sign-up/[[...sign-up]]/page.jsx)
- **Description**: Rendered Clerk's catch-all `<SignIn />` and `<SignUp />` components within the `(auth)` route group.

### 3. Middleware Optimization
- **File**: [`middleware.ts`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/S.E.T/expense-tracker/middleware.ts)
- **Description**: Configured route protection using Clerk's `clerkMiddleware()` and `createRouteMatcher()`. Protected `/dashboard(.*)` routes while keeping public routes (`/`, `/sign-in`, `/sign-up`) accessible.

### 4. Header Auth Controls & Navigation
- **File**: [`app/_components/Header.jsx`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/S.E.T/expense-tracker/app/_components/Header.jsx)
- **Description**: Integrated Clerk's `useUser()` hook and `<UserButton />`:
  - Displays a **Dashboard** button and `<UserButton />` when user is signed in.
  - Displays a **Get Started** button linking to `/sign-in` when user is signed out.

### 5. Hero CTA Update
- **File**: [`app/_components/Hero.jsx`](file:///c:/Users/ASHUTOSH/OneDrive/Pictures/Desktop/S.E.T/expense-tracker/app/_components/Hero.jsx)
- **Description**: Updated the primary CTA button to direct users directly to `/sign-in`.

---

## Environment Variables Setup

Ensure your `.env.local` file contains the following Clerk configuration keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **View Auth Pages**:
   - Home Page: `http://localhost:3000`
   - Sign In Page: `http://localhost:3000/sign-in`
   - Sign Up Page: `http://localhost:3000/sign-up`
   - Dashboard: `http://localhost:3000/dashboard` (Protected route)

4. **Build Production Application**:
   ```bash
   npm run build
   ```
