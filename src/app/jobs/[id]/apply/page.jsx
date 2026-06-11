import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import ApplyForm from "./ApplyForm";

export default async function ApplyPage({ params }) {
  const { id } = params || {};

  const user = await getUserSession();
  if (!user) {
    // Safely encode the path target
    const fallbackPath = encodeURIComponent(`/jobs/${id}/apply`);
    return redirect(`/login?next=${fallbackPath}`);
  }

  return <ApplyForm jobId={id} user={user} />;
}