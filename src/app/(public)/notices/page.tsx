import { getActiveNotices } from "@/services/notices";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: "alert" | "general" | "event" | string;
  created_at: string;
}

export default async function NoticesPage() {
  const notices: Notice[] = await getActiveNotices();

  const getBadgeStyle = (type: string) => {
    switch (type?.toLowerCase()) {
      case "alert":
        return "bg-red-100 text-red-800 border-red-200";
      case "event":
        return "bg-green-100 text-green-800 border-green-200";
      case "general":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="bg-gray-100 border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Notice Board
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Stay updated with the latest announcements, events, and important alerts.
          </p>
        </div>
      </section>

      {/* Notice Feed */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!notices || notices.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
            No active notices available at this time.
          </div>
        ) : (
          <div className="flex flex-col">
            {notices.map((notice) => (
              <article
                key={notice.id}
                className="bg-white shadow rounded-lg p-6 mb-4 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {notice.title}
                    </h2>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getBadgeStyle(
                        notice.type
                      )}`}
                    >
                      {notice.type}
                    </span>
                  </div>
                  <time
                    dateTime={notice.created_at}
                    className="text-sm text-gray-500 shrink-0"
                  >
                    {formatDate(notice.created_at)}
                  </time>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {notice.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}