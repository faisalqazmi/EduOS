import { createClient } from '@/lib/supabase/server';
import PageEditorForm from '@/components/admin/PageEditorForm';

export default async function PageAdminEditPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  let initialData = null;

  const isNewPage = params.id === 'new';

  if (!isNewPage) {
    const { data, error } = await supabase.from('pages').select('*').eq('id', params.id).single();
    if (error) {
      console.error('Error fetching page:', error);
      // Optionally handle error state, e.g., redirect or show message
    }
    initialData = data;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isNewPage ? 'Create Page' : 'Edit Page'}
      </h1>
      <PageEditorForm initialData={initialData} />
    </div>
  );
}
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Assume these services exist in @/services/cms
// Example structure:
// export async function createPage(pageData: any) { /* ... */ }
// export async function updatePage(id: string, pageData: any) { /* ... */ }
import { createPage, updatePage } from '@/services/cms';

interface PageEditorFormProps {
  initialData: any | null; // A proper type for Page would be better here
}

export default function PageEditorForm({ initialData }: PageEditorFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isPublished, setIsPublished] = useState(initialData?.is_published || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const pageData = {
        title,
        slug,
        meta_description: metaDescription,
        content,
        is_published: isPublished,
      };

      if (initialData) {
        // Update existing page
        await updatePage(initialData.id, pageData);
      } else {
        // Create new page
        await createPage(pageData);
      }

      router.push('/admin/pages'); // Redirect to the pages list on success
    } catch (error) {
      console.error('Failed to save page:', error);
      // Optionally show a user-friendly error message
      alert('Failed to save page. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Page Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
          Slug
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="slug"
          type="text"
          placeholder="page-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meta_description">
          Meta Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="meta_description"
          placeholder="Short description for SEO"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          Content (HTML)
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono text-sm"
          id="content"
          placeholder="<!-- Your HTML content here -->"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
        />
      </div>

      <div className="mb-6 flex items-center">
        <input
          className="mr-2 leading-tight"
          id="is_published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        <label className="text-sm text-gray-700" htmlFor="is_published">
          Publish Page
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Page'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/pages')}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}