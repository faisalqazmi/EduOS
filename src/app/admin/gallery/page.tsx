import { getGalleryImages } from "@/services/gallery";
import { GalleryManager } from "./GalleryManager";

export default async function AdminGalleryPage() {
  const allImages = await getGalleryImages();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>
      <GalleryManager initialImages={allImages} />
    </div>
  );
}
