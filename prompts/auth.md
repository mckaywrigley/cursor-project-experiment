# Auth Instructions

Use Clerk for authentication.

Below you will find some generic instructions and documentation for how to set things up.

## Next.js Quickstart

You will learn the following:
Install @clerk/nextjs
Set up your environment keys to test your app locally
Add <ClerkProvider /> to your application
Use Clerk middleware to implement route-specific authentication
Create a header with Clerk components for users to sign in and out
Before you start
Set up a Clerk application
Create a Next.js application
Example repositories
App router
Pages router
Install @clerk/nextjs
Clerk's Next.js SDK has prebuilt components, React hooks, and helpers to make user authentication easier.

To get started using Clerk with Next.js, add the SDK to your project:

npm
yarn
pnpm
terminal

npm install @clerk/nextjs
Set your environment variables
Add the following keys to your .env.local file. These keys can always be retrieved from the API Keys page of your Clerk Dashboard.

.env.local

Takeoff

Takeoff

Add Middleware to your application
clerkMiddleware() grants you access to user authentication state throughout your application, on any route or page. It also allows you to protect specific routes from unauthenticated users. To add clerkMiddleware() to your application, follow these steps:

Create a middleware.ts file.

If you're using the /src directory, place middleware.ts in the /src directory.
If you're not using the /src directory, place middleware.ts in the root directory alongside .env.local.
In your middleware.ts, export Clerk's clerkMiddleware() helper:

middleware.ts

import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
matcher: [
// Skip Next.js internals and all static files, unless found in search params
'/((?!\_next|[^?]_\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest))._)',
// Always run for API routes
'/(api|trpc)(.\*)',
],
}
By default, clerkMiddleware() will not protect any routes. All routes are public and you must opt-in to protection for routes. See the clerkMiddleware() reference to learn how to require authentication for specific routes.

Add <ClerkProvider> and components to your app
All Clerk hooks and components must be children of the <ClerkProvider> component, which provides active session and user context.

You can control which content signed in and signed out users can see with Clerk's prebuilt components. To get started, create a header for your users to sign in or out. To do this, you will use:

<SignedIn>: Children of this component can only be seen while signed in.
<SignedOut>: Children of this component can only be seen while signed out.
<UserButton />: A prebuilt component that comes styled out of the box to show the avatar from the account the user is signed in with.
<SignInButton />: An unstyled component that links to the sign-in page or displays the sign-in modal.
Select your preferred router to learn how to make this data available across your entire app:

App Router
Pages Router
app/layout.tsx

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<ClerkProvider>

<html lang="en">
<body>
<header>
<SignedOut>
<SignInButton />
</SignedOut>
<SignedIn>
<UserButton />
</SignedIn>
</header>
<main>{children}</main>
</body>
</html>
</ClerkProvider>
)
}

Read session and user data in your Next.js app with Clerk
Clerk provides a set of hooks and helpers that you can use to access the active session and user data in your Next.js application. Here are examples of how to use these helpers in both the client and server side to get you started.

Server side
App Router
auth() and currentUser() are App Router-specific helpers that you can use inside of your Route Handlers, Middleware, Server Components, and Server Actions.

The auth() helper will return the Auth object of the currently active user. Now that request data is available in the global scope through Next.js's headers() and cookies() methods, passing the request object to Clerk is no longer required.

The currentUser() helper will return the Backend User object of the currently active user. This is helpful if you want to render information, like their first and last name, directly from the server.

Under the hood, currentUser() uses the clerkClient wrapper to make a call to Clerk's Backend API. This does count towards the Backend API Request Rate Limit. This also uses fetch() so it is automatically deduped per request.

Note

Any requests from a Client Component to a Route Handler will read the session from cookies and will not need the token sent as a Bearer token.

Server components and actions
Route Handler
Route Handler w/ User Fetch
This example uses the new auth() helper to validate an authenticated user and the new currentUser() helper to access the Backend API User object for the authenticated user.

app/page.tsx

import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Page() {
// Get the userId from auth() -- if null, the user is not signed in
const { userId } = auth()

if (userId) {
// Query DB for user specific information or display assets only to signed in users
}

// Get the Backend API User object when you need access to the user's information
const user = await currentUser()
// Use `user` to render user details or create UI elements
}

Client side
useAuth
The useAuth hook is a convenient way to access the current auth state. This hook provides the minimal information needed for data-loading and helper methods to manage the current active session.

example.tsx

'use client'
import { useAuth } from '@clerk/nextjs'

export default function Example() {
const { isLoaded, userId, sessionId, getToken } = useAuth()

// In case the user signs out while on the page.
if (!isLoaded || !userId) {
return null
}

return (

<div>
Hello, {userId} your current active session is {sessionId}
</div>
)
}
useUser
The useUser hook is a convenient way to access the current user data where you need it. This hook provides the user data and helper methods to manage the current active session.

example.tsx

'use client'
import { useUser } from '@clerk/nextjs'

export default function Example() {
const { isLoaded, isSignedIn, user } = useUser()

if (!isLoaded || !isSignedIn) {
return null
}

return <div>Hello, {user.firstName} welcome to Clerk</div>
}

## Provider

Wrap layout in <ClerkProvider>

## Middleware

Create a middleware.ts file at the root of the project follow this example.

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = auth();

  // For users visiting /onboarding, don't try to redirect
  if (userId && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: "/login" });
  }

  // If the user is logged in and the route is protected, let them view.
  if (userId && isProtectedRoute(req)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
```

## Login Page

The login page needs to go at app/(auth)/login/[...login]/page.tsx

```tsx
"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const { theme } = useTheme();

  return <SignIn appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />;
}
```

## Sign Up Page

The sign up page needs to go at app/(auth)/sign-up/[...sign-up]/page.tsx

```tsx
"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();

  return <SignUp appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />;
}
```

## Rules

(auth) can only be used in server components and functions
