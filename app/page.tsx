import { redirect } from "next/navigation";
import { getOptionalSession } from "@/lib/dal";

export default async function Home() {
  const session = await getOptionalSession();

  if (!session) {
    redirect("/login");
  }

  redirect(session.isAdmin ? "/admin" : "/dashboard");
}
