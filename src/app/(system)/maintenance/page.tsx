import { Wrench } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <Wrench className="w-16 h-16 text-primary mb-6 mx-auto animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Maintenance</h1>
        <p className="text-gray-600">
          We are currently updating our systems to improve your experience. The portal will be back online shortly. Thank you for your patience.
        </p>
      </div>
    </div>
  );
}