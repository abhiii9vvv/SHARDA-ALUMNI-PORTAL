export const metadata = {
  title: "Contact Us | Sharda University Alumni Portal",
  description: "Contact the Sharda University Alumni Portal team for support, questions, or feedback.",
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import ClientContactForm from "./ClientContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex items-center justify-center py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        <Card className="bg-white/90 border-0 shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-blue-900 mb-2">Contact Us</CardTitle>
            <p className="text-gray-600 mb-2">We'd love to hear from you! Reach out for support, feedback, or partnership opportunities.</p>
          </CardHeader>
          <CardContent>
            <div className="mb-8 flex flex-col md:flex-row gap-6 justify-between">
              <div className="flex items-center gap-3 text-blue-700">
                <Mail className="w-5 h-5" /> alumni@shardauniversity.edu
              </div>
              <div className="flex items-center gap-3 text-blue-700">
                <Phone className="w-5 h-5" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-3 text-blue-700">
                <MapPin className="w-5 h-5" /> Greater Noida, India
              </div>
            </div>
            <ClientContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 