import { getDepartments } from "@/services/departments";
import { DepartmentManager } from "./DepartmentManager";

export default async function DepartmentPage() {
  const allDepartments = await getDepartments();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Manage Departments</h1>
      <DepartmentManager initialData={allDepartments} />
    </div>
  );
}
