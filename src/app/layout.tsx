import { createClient } from "@/lib/supabase/server";
import "./globals.css";

export async function generateMetadata() {
  const supabase = createClient();
  const { data } = await supabase.from("institution_settings").select("*").single();
  return {
    title: data?.site_name || "EduOS",
    description: data?.tagline || "Institution Portal",
    icons: { icon: data?.favicon_url || "/favicon.ico" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data } = await supabase.from("institution_settings").select("*").single();

  return (
    <html lang="en">
      <body
        style={{
          "--color-primary": data?.primary_color || "#0f172a",
          "--color-secondary": data?.secondary_color || "#3b82f6",
        } as React.CSSProperties}
      >
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
