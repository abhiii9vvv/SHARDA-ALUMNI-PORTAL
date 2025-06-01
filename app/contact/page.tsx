import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Us | Sharda University Alumni Portal",
  description: "Contact the Sharda University Alumni Portal team for support, questions, or feedback.",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

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
            {submitted ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-green-700 mb-2">Thank you for reaching out!</h2>
                <p className="text-gray-600 mb-4">Your message has been received. Our team will get back to you soon.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 