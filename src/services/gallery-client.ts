import { createClient } from "@/lib/supabase/client";

export async function uploadToGalleryClient(title: string, file: File) {
  const supabase = createClient();
  const uniqueName = `${Date.now()}-${file.name}`;
  
  // 1. Upload to storage bucket
  const { error: storageError } = await supabase.storage
    .from("gallery")
    .upload(uniqueName, file, { upsert: true });

  if (storageError) throw new Error(storageError.message);

  // 2. Get public URL
  const { data: urlData } = supabase.storage
    .from("gallery")
    .getPublicUrl(uniqueName);

  // 3. Insert row into gallery table
  const { error: dbError } = await supabase.from("gallery").insert([
    {
      title,
      image_url: urlData.publicUrl,
    },
  ]);

  if (dbError) throw new Error(dbError.message);
  return true;
}

export async function deleteGalleryImageClient(id: string | number) {
  const supabase = createClient();
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}
