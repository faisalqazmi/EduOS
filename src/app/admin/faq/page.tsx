import { getFaqs } from "@/services/faq";
import { FaqManager } from "./FaqManager";

export default async function AdminFaqPage() {
  const allFaqs = await getFaqs();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage FAQs</h1>
      <FaqManager initialData={allFaqs} />
    </div>
  );
}
