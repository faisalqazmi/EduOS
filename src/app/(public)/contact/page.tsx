import { getSettingsServer } from "@/services/settings";
import { Mail, Phone } from "lucide-react";

export default async function ContactPage() {
  const settings = await getSettingsServer();

  const email = settings?.contact_email || "contact@example.com";
  const phone = settings?.contact_phone || "+1 (555) 000-0000";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        {/* Left Column: Contact Info */}
        <div className="flex flex-col justify-start space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-gray-600">
            Have questions or need assistance? Reach out to us and our team will get back to you as soon as possible.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="w-5 h-5 text-indigo-600" />
              <span>{email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Phone className="w-5 h-5 text-indigo-600" />
              <span>{phone}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white shadow rounded-lg p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-150 font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Integration Placeholder */}
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        Map Integration Placeholder
      </div>
    </div>
  );
}