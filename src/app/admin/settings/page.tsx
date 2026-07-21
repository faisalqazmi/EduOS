import { getSettingsServer } from "@/services/settings";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const currentSettings = await getSettingsServer();

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Global Institution Settings
      </h1>
      <SettingsForm initialData={currentSettings} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettingsClient } from "@/services/settings";
import { uploadFile } from "@/services/storage";

export function SettingsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    site_name: initialData?.site_name || "",
    tagline: initialData?.tagline || "",
    primary_color: initialData?.primary_color || "#000000",
    secondary_color: initialData?.secondary_color || "#ffffff",
    contact_email: initialData?.contact_email || "",
    contact_phone: initialData?.contact_phone || "",
    logo_url: initialData?.logo_url || "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let logoUrl = formData.logo_url;

      if (logoFile) {
        logoUrl = await uploadFile("logos", "main-logo", logoFile);
      }

      const updatedSettings = {
        ...formData,
        logo_url: logoUrl,
      };

      await updateSettingsClient(updatedSettings);
      router.refresh();
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
          Branding
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Site Name
            </label>
            <input
              type="text"
              name="site_name"
              value={formData.site_name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Logo Upload
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
          Colors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primary_color"
                value={formData.primary_color}
                onChange={handleChange}
                className="h-10 w-10 cursor-pointer rounded border border-gray-300 p-1"
              />
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                {formData.primary_color}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Secondary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="secondary_color"
                value={formData.secondary_color}
                onChange={handleChange}
                className="h-10 w-10 cursor-pointer rounded border border-gray-300 p-1"
              />
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                {formData.secondary_color}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2">
          Contact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}