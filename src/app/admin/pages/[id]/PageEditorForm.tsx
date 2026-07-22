"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPage, updatePage } from "@/services/cms";

export function PageEditorForm({ initialData }: { initialData: any | null }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    meta_description: initialData?.meta_description || "",
    content: initialData?.content || "",
    is_published: initialData?.is_published || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (initialData) {
        await updatePage(initialData.id, formData);
      } else {
        await createPage(formData);
      }
      router.push("/admin/pages");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save page.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1">Title</label>
        <input
          type="text"
          required
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">URL Slug</label>
        <input
          type="text"
          required
          className="w-full border p-2 rounded"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Meta Description</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={2}
          value={formData.meta_description}
          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-1">Content (HTML)</label>
        <textarea
          className="w-full border p-2 rounded font-mono text-sm"
          rows={12}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.is_published}
          onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
        />
        <label htmlFor="published" className="text-sm font-bold">Publish Page</label>
      </div>
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded font-bold disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Page"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/pages")}
          className="text-gray-600 px-6 py-2 rounded font-bold hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
