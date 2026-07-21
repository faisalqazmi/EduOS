import { createServerClient } from '@/lib/supabase/server';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import React from 'react';

interface InstitutionSettings {
  site_name: string;
  logo_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('institution_settings')
    .select('site_name, logo_url, contact_email, contact_phone, address')
    .single();

  const settings: InstitutionSettings = {
    site_name: data?.site_name || 'EduOS',
    logo_url: data?.logo_url || null,
    contact_email: data?.contact_email || null,
    contact_phone: data?.contact_phone || null,
    address: data?.address || null,
  };

  if (error) {
    console.error('Error fetching institution settings:', error.message);
    // In a production environment, you might want to log this error to an external service
    // or provide a more user-friendly fallback, but for now, we proceed with defaults.
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={settings} />
      <main className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </div>
  );
}