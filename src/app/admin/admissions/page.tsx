"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAdmissions, updateAdmissionStatus } from "@/services/admissions";

export default async function AdmissionsPage() {
  const applications = await getAdmissions();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admissions Inquiries</h1>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3">Applicant</th>
              <th scope="col" className="px-6 py-3">Contact</th>
              <th scope="col" className="px-6 py-3">Program</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {applications.map((app: any) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {app.applicant_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  <div>{app.email}</div>
                  <div className="text-xs text-gray-400">{app.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {app.program_of_interest}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(app.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                  {app.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusUpdater id={app.id} currentStatus={app.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusUpdater({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setIsUpdating(true);
    try {
      await updateAdmissionStatus(id, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={isUpdating}
      className={`block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-opacity ${
        isUpdating ? "opacity-50 cursor-not-allowed" : "opacity-100"
      }`}
    >
      <option value="Pending">Pending</option>
      <option value="Reviewed">Reviewed</option>
      <option value="Accepted">Accepted</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
}