import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-serif font-bold text-black mb-4">Page Not Found</h2>
        <p className="text-gray-800 mb-4">
          We couldn't find the page you were looking for.
        </p>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
