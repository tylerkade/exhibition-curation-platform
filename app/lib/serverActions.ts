"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
  user_id: z.string(),
  username: z.string(),
  name: z.string(),
});

const RegisterUser = FormSchema.omit({ user_id: true });

export async function signUp(formData: FormData) {
  const { username, name } = RegisterUser.parse({
    username: formData.get("username"),
    name: formData.get("name"),
  });

  try {
    await sql`insert into users (username, name)
              values (${username}, ${name})`;
  } catch (e: unknown) {
    throw e;
  }
  revalidatePath("/signup");
  redirect(`/login`);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      username: formData.get("username"),
    });

    if (res?.error) {
      return "Invalid credentials.";
    }
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function UserSignOut() {
  await signOut({ redirectTo: "/", redirect: true });
}
