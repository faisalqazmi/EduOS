"use client";

import { useState } from "react";
import { submitApplicationClient } from "@/services/admissions-client";

export function AdmissionsForm() {
  const [formData, setFormData] = useState({
    applicant_name: "",
    email: "",
    phone: "",
    program_of_interest: "B.Tech CS",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await submitApplicationClient(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Admission</h1>
        <p className="text-gray-600 mb-8">Take the first step toward your future. Fill out the form below.</p>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
            <h3 className="font-bold text-lg mb-1">Application Received!</h3>
            <p>Your application has been received. Our admissions team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full border rounded-md p-2.5 text-sm"
                value={formData.applicant_name}
                onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full border rounded-md p-2.5 text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full border rounded-md p-2.5 text-sm"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program of Interest</label>
              <select
                className="w-full border rounded-md p-2.5 text-sm bg-white"
                value={formData.program_of_interest}
                onChange={(e) => setFormData({ ...formData, program_of_interest: e.target.value })}
              >
                <option value="B.Tech CS">B.Tech Computer Science & Engineering</option>
                <option value="B.Tech Mechanical">B.Tech Mechanical Engineering</option>
                <option value="MBA">Master of Business Administration (MBA)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50 mt-6"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
