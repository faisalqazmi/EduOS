import { getPrograms } from "@/services/programs";
import { ProgramManager } from "./ProgramManager";

export default async function AdminProgramsPage() {
  const allPrograms = await getPrograms();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Academic Programs</h1>
      <ProgramManager initialData={allPrograms} />
    </div>
  );
}
