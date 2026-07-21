import { getFaqs } from "@/services/faq";

interface FAQ {
  id?: string | number;
  question: string;
  answer: string;
  category: string;
}

export default async function FAQPage() {
  const faqs = await getFaqs();

  const groupedFaqs = faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-16">
      <header className="max-w-3xl mx-auto pt-16 pb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Frequently Asked Questions
        </h1>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
          <section key={category}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b">
              {category}
            </h2>
            <div>
              {categoryFaqs.map((faq, index) => (
                <div
                  key={faq.id || index}
                  className="mb-4 p-6 bg-white border rounded-lg shadow-sm"
                >
                  <p className="font-bold text-gray-900 mb-2">{faq.question}</p>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}