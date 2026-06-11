import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import ApplyForm from "./ApplyForm";

export default async function ApplyPage({ params }) {
  const { id } = params || {};

  const user = await getUserSession();
  if (!user) {
    return redirect("/login");
  }

  return <ApplyForm jobId={id} user={user} />;
}
