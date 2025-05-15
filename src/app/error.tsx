"use client";

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-serif font-bold text-black mb-4">Something went wrong!</h2>
        <p className="text-gray-800 mb-4">
          We apologize for the inconvenience. An error has occurred.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
