import { getFacultyList } from "@/services/faculty";
import { FacultyManager } from "./FacultyManager";

export default async function FacultyPage() {
  const initialFaculty = await getFacultyList();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
      <FacultyManager initialData={initialFaculty} />
    </div>
  );
}
