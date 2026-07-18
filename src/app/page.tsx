import { redirect } from "next/navigation";
import { getSafeSession } from "@/lib/api/auth0";

export default async function Home() {
  const session = await getSafeSession();
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
