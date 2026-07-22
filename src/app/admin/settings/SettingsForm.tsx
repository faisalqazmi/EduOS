"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettingsClient } from "@/services/settings";
import { uploadFile } from "@/services/storage";

export function SettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    site_name: initialData?.site_name || "",
    tagline: initialData?.tagline || "",
    primary_color: initialData?.primary_color || "#0f172a",
    secondary_color: initialData?.secondary_color || "#3b82f6",
    contact_email: initialData?.contact_email || "",
    contact_phone: initialData?.contact_phone || "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let updates = { ...formData };
      
      if (logoFile) {
        const logo_url = await uploadFile("logos", `logo-${Date.now()}`, logoFile);
        updates = { ...updates, logo_url } as any;
      }

      await updateSettingsClient(updates);
      router.refresh();
      alert("Settings updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Site Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.site_name}
            onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tagline</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Phone</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.contact_phone}
            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Primary Color</label>
          <input
            type="color"
            className="w-full h-10 border rounded cursor-pointer"
            value={formData.primary_color}
            onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Secondary Color</label>
          <input
            type="color"
            className="w-full h-10 border rounded cursor-pointer"
            value={formData.secondary_color}
            onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Upload New Logo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-2 rounded font-medium disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
