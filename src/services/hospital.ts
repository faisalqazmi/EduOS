import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createBrowserClient } from '@/lib/supabase/client';

export interface HospitalFacilityData {
  id: string;
  name: string;
  type: string;
  description: string;
  timing: string;
  contact_number: string;
  created_at: string;
}

export async function getHospitalFacilities(): Promise<HospitalFacilityData[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('hospital_facilities')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return (data as HospitalFacilityData[]) || [];
  } catch (error: any) {
    throw new Error(`Failed to fetch hospital facilities: ${error.message || 'Database error occurred'}`);
  }
}

export async function createFacility(
  data: Omit<HospitalFacilityData, 'id' | 'created_at'>
): Promise<HospitalFacilityData> {
  try {
    const supabase = createBrowserClient();
    const { data: createdData, error } = await supabase
      .from('hospital_facilities')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return createdData as HospitalFacilityData;
  } catch (error: any) {
    throw new Error(`Failed to create facility: ${error.message || 'Database error occurred'}`);
  }
}

export async function updateFacility(
  id: string,
  updates: Partial<HospitalFacilityData>
): Promise<HospitalFacilityData> {
  try {
    const supabase = createBrowserClient();
    const { data: updatedData, error } = await supabase
      .from('hospital_facilities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return updatedData as HospitalFacilityData;
  } catch (error: any) {
    throw new Error(`Failed to update facility: ${error.message || 'Database error occurred'}`);
  }
}

export async function deleteFacility(id: string): Promise<void> {
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from('hospital_facilities')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error: any) {
    throw new Error(`Failed to delete facility: ${error.message || 'Database error occurred'}`);
  }
}