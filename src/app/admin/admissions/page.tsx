import { getAdmissions } from "@/services/admissions";
import { AdmissionsClient } from "./AdmissionsClient";

export default async function AdmissionsPage() {
  const applications = await getAdmissions();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admissions Inquiries</h1>
      <AdmissionsClient applications={applications} />
    </div>
  );
}
