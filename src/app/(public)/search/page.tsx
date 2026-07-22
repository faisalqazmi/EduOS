import { globalSearch } from "@/services/search";
import { SearchInterface } from "./SearchInterface";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = query ? await globalSearch(query) : [];

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <SearchInterface initialQuery={query} results={results} />
    </div>
  );
}
