import { createClient as createClientClient } from '@/lib/supabase/client';
import { createClient as createClientServer } from '@/lib/supabase/server';
import { uploadFile } from '@/services/storage';

export interface Faculty {
  id: string;
  created_at: string; // ISO 8601 string, e.g., '2023-10-27T10:00:00.000Z'
  name: string;
  department: string;
  designation: string;
  bio: string | null;
  email: string;
  image_url: string | null;
}

export interface CreateFacultyData {
  name: string;
  department: string;
  designation: string;
  bio?: string | null; // Optional and nullable
  email: string;
  // image_url is handled by uploadFacultyImage
}

export interface UpdateFacultyData {
  name?: string;
  department?: string;
  designation?: string;
  bio?: string | null;
  email?: string;
  image_url?: string | null;
}

const supabaseClient = createClientClient();

export async function getFacultyList(): Promise<Faculty[]> {
  const supabase = createClientServer();
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .order('department', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching faculty list:', error);
    throw new Error(error.message);
  }
  return data as Faculty[];
}

export async function createFacultyMember(data: CreateFacultyData): Promise<Faculty> {
  const { data: newFaculty, error } = await supabaseClient
    .from('faculty')
    .insert(data)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating faculty member:', error);
    throw new Error(error.message);
  }
  return newFaculty as Faculty;
}

export async function updateFacultyMember(id: string, data: UpdateFacultyData): Promise<Faculty> {
  const { data: updatedFaculty, error } = await supabaseClient
    .from('faculty')
    .update(data)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating faculty member:', error);
    throw new Error(error.message);
  }
  return updatedFaculty as Faculty;
}

export async function deleteFacultyMember(id: string): Promise<void> {
  const { error } = await supabaseClient
    .from('faculty')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting faculty member:', error);
    throw new Error(error.message);
  }
}

export async function uploadFacultyImage(facultyId: string, file: File): Promise<string> {
  const fileName = `${facultyId}-${file.name}`;
  const publicUrl = await uploadFile('faculty-images', fileName, file);

  await updateFacultyMember(facultyId, { image_url: publicUrl });

  return publicUrl;
}