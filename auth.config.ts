import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.username) {
        session.user.username = token.username as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const protectedRoutes = ["/dashboard"];
      const publicRoutes = ["/"];

      const isLoggedIn = !!auth?.user;
      const isLoginRoute = nextUrl.pathname === "/login";
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

      if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
