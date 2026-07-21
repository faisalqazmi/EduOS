import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function uploadFile(bucket: string, path: string, file: File): Promise<string> {
  try {
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Failed to upload file to bucket "${bucket}" at path "${path}": ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error(`Failed to retrieve public URL for file at path "${path}" in bucket "${bucket}".`);
    }

    return publicUrlData.publicUrl;

  } catch (error) {
    console.error("Error during file upload:", error);
    if (error instanceof Error) {
      throw new Error(`Storage service error during upload: ${error.message}`);
    }
    throw new Error("An unknown error occurred during file upload.");
  }
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw new Error(`Failed to delete file from bucket "${bucket}" at path "${path}": ${error.message}`);
    }
  } catch (error) {
    console.error("Error during file deletion:", error);
    if (error instanceof Error) {
      throw new Error(`Storage service error during deletion: ${error.message}`);
    }
    throw new Error("An unknown error occurred during file deletion.");
  }
}