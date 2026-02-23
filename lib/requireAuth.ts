import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  return {
    name: session.user.name || session.user.email.split("@")[0],
    email: session.user.email,
    plan: ((session.user as any).plan || "free") as "free" | "premium",
    tokens: ((session.user as any).tokens ?? 4) as number,
  };
}
