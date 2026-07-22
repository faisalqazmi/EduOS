import { getSettingsServer } from "@/services/settings";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const currentSettings = await getSettingsServer();

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Global Institution Settings
      </h1>
      <SettingsForm initialData={currentSettings} />
    </div>
  );
}
