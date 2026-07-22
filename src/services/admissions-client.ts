import { createClient } from "@/lib/supabase/client";

export async function submitApplicationClient(data: {
  applicant_name: string;
  email: string;
  phone: string;
  program_of_interest: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from("admissions").insert([
    {
      ...data,
      status: "pending",
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
  return true;
}
