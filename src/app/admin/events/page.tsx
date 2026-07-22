import { getAllEvents } from "@/services/events";
import { EventManager } from "./EventManager";

export default async function Page() {
  const allEvents = await getAllEvents();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events & Calendar</h1>
      <EventManager initialData={allEvents} />
    </div>
  );
}
