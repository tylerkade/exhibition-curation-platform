import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
  }

  interface Session {
    user: {
      name: string;
      username: string;
    };
  }
}
