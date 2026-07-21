"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPlacements,
  createPlacement,
  updatePlacement,
  deletePlacement,
} from "@/services/placements";

export default async function AdminPlacementsPage() {
  const allPlacements = await getPlacements();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Manage Placements & Careers
      </h1>
      <PlacementManager initialData={allPlacements} />
    </div>
  );
}

export function PlacementManager({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    student_name: "",
    company_name: "",
    role: "",
    package_lpa: "",
    batch_year: new Date().getFullYear().toString(),
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      student_name: "",
      company_name: "",
      role: "",
      package_lpa: "",
      batch_year: new Date().getFullYear().toString(),
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      student_name: item.student_name || "",
      company_name: item.company_name || "",
      role: item.role || "",
      package_lpa: item.package_lpa?.toString() || "",
      batch_year: item.batch_year?.toString() || new Date().getFullYear().toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this placement record?")) {
      await deletePlacement(id);
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      student_name: formData.student_name,
      company_name: formData.company_name,
      role: formData.role,
      package_lpa: parseFloat(formData.package_lpa) || 0,
      batch_year: parseInt(formData.batch_year, 10) || new Date().getFullYear(),
    };

    if (editingId) {
      await updatePlacement(editingId, payload);
    } else {
      await createPlacement(payload);
    }

    router.refresh();
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      student_name: "",
      company_name: "",
      role: "",
      package_lpa: "",
      batch_year: new Date().getFullYear().toString(),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Record Placement
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Student</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Company</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Package (LPA)</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Batch Year</th>
              <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {initialData && initialData.length > 0 ? (
              initialData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.student_name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.company_name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.role}</td>
                  <td className="px-6 py-4 text-gray-600">{item.package_lpa}</td>
                  <td className="px-6 py-4 text-gray-600">{item.batch_year}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No placements recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingId ? "Edit Placement Record" : "Record Placement"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.student_name}
                  onChange={(e) =>
                    setFormData({ ...formData, student_name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package (LPA)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.package_lpa}
                  onChange={(e) =>
                    setFormData({ ...formData, package_lpa: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch Year
                </label>
                <input
                  type="number"
                  required
                  value={formData.batch_year}
                  onChange={(e) =>
                    setFormData({ ...formData, batch_year: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}