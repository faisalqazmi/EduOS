import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createBrowserClient } from '@/lib/supabase/client';

export interface FaqData {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  created_at: string;
}

export type CreateFaqInput = Omit<FaqData, 'id' | 'created_at'>;
export type UpdateFaqInput = Partial<Omit<FaqData, 'id' | 'created_at'>>;

export async function getFaqs(): Promise<FaqData[]> {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error.message);
    throw new Error(error.message);
  }

  return (data as FaqData[]) || [];
}

export async function createFaq(data: CreateFaqInput): Promise<FaqData> {
  const supabase = createBrowserClient();
  const { data: createdFaq, error } = await supabase
    .from('faqs')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating FAQ:', error.message);
    throw new Error(error.message);
  }

  return createdFaq as FaqData;
}

export async function updateFaq(id: string, updates: UpdateFaqInput): Promise<FaqData> {
  const supabase = createBrowserClient();
  const { data: updatedFaq, error } = await supabase
    .from('faqs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating FAQ with ID ${id}:`, error.message);
    throw new Error(error.message);
  }

  return updatedFaq as FaqData;
}

export async function deleteFaq(id: string): Promise<void> {
  const supabase = createBrowserClient();
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting FAQ with ID ${id}:`, error.message);
    throw new Error(error.message);
  }
}