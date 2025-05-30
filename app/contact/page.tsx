import React from "react";

export const metadata = {
  title: "Contact Us | Sharda University Alumni Portal",
  description: "Contact the Sharda University Alumni Portal team for support, questions, or feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Contact Us</h1>
      <p className="text-gray-700 text-center max-w-xl">
        This is a placeholder for the Contact page. Please reach out to alumni@shardauniversity.edu for any queries or support.
      </p>
    </div>
  );
} 