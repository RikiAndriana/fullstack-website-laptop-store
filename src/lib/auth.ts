import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const AUTH_COOKIE = "laptopku_owner";

export async function requireAdmin() {
  const session = (await cookies()).get(AUTH_COOKIE)?.value;
  if (session !== "active") {
    redirect("/admin/login");
  }
}
