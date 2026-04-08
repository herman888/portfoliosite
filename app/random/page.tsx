import { redirect } from "next/navigation";

/** Eats gallery temporarily disabled — send visitors home. */
export default function RandomPage() {
  redirect("/");
}
