import { getAllNotices } from "@/services/notices";
import { NoticeManager } from "./NoticeManager";

export default async function AdminNoticesPage() {
  const allNotices = await getAllNotices();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Notices & Announcements</h1>
      <NoticeManager initialData={allNotices} />
    </div>
  );
}
