import { getPlacements } from "@/services/placements";
import { PlacementManager } from "./PlacementManager";

export default async function AdminPlacementsPage() {
  const allPlacements = await getPlacements();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Manage Placements & Careers
      </h1>
      <PlacementManager initialData={allPlacements} />
    </div>
  );
}
