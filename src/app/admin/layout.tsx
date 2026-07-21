import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session || !session.user) {
    redirect('/login');
  }

  const isAdmin = session.user.user_metadata.is_admin;

  if (!isAdmin) {
    redirect('/login');
  }

  const userEmail = session.user.email || 'Admin User'; // Provide a fallback

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar userEmail={userEmail} />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}