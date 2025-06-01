'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function CreateSuccessStoryPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    graduationYear: "",
    degree: "",
    position: "",
    story: "",
    image: null as File | null,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <Card className="max-w-lg w-full text-center">
          <CardHeader>
            <CardTitle>Thank you for sharing your story!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your success story has been submitted for review. We appreciate your contribution to the alumni community.</p>
            <Button onClick={() => router.push("/success-stories")}>Back to Success Stories</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Share Your Success Story</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                placeholder="e.g. 2018"
                value={form.graduationYear}
                onChange={handleChange}
                required
                type="number"
                min="1950"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                placeholder="e.g. B.Tech Computer Science"
                value={form.degree}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Current Position</Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g. Software Engineer at Google"
                value={form.position}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="story">Your Story</Label>
              <Textarea
                id="story"
                name="story"
                placeholder="Share your journey, achievements, and advice for fellow alumni..."
                value={form.story}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="image">Profile Image (optional)</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Story"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 