import { createClient } from "@/lib/supabase/server";
import { PageEditorForm } from "./PageEditorForm";

export default async function PageAdminEditPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  let initialData = null;
  const isNewPage = params.id === "new";

  if (!isNewPage) {
    const { data } = await supabase.from("pages").select("*").eq("id", params.id).single();
    initialData = data;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isNewPage ? "Create Page" : "Edit Page"}
      </h1>
      <PageEditorForm initialData={initialData} />
    </div>
  );
}
