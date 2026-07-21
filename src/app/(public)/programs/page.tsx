import Link from "next/link";
import { getPrograms } from "@/services/programs";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Academic Programs & Degrees
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div
              key={program.slug || program.id}
              className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {program.department}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {program.name}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                  {program.description}
                </p>
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Duration</span>
                    <span className="font-semibold text-gray-900">{program.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Tuition Fee</span>
                    <span className="font-semibold text-gray-900">{program.tuition_fee}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href={`/programs/${program.slug}`}
                  className="block w-full text-center bg-primary text-white py-2.5 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}