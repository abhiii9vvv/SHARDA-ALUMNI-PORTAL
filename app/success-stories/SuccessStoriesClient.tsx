"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SuccessStoriesClient() {
  // Types
  type SuccessStory = {
    id: number;
    name: string;
    title: string;
    photo: string;
    summary: string;
    graduationYear: string;
    industry: string;
    batch: string;
  };

  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = (await import("@/lib/supabase/client")).getSupabaseClient();
        const { data, error } = await supabase
          .from("success_stories")
          .select("id, name, title, photo, summary, graduation_year, industry, batch")
          .order("graduation_year", { ascending: false });
        if (error) {
          setError("Failed to load success stories.");
        } else {
          setSuccessStories(
            (data || []).map((story: any) => ({
              id: story.id,
              name: story.name,
              title: story.title,
              photo: story.photo || "/images/alumni-placeholder.png",
              summary: story.summary,
              graduationYear: story.graduation_year,
              industry: story.industry,
              batch: story.batch,
            }))
          );
        }
      } catch (err) {
        setError("Failed to load success stories.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const batches = Array.from(new Set(successStories.map(s => s.batch))).sort((a, b) => b.localeCompare(a));
  const industries = Array.from(new Set(successStories.map(s => s.industry))).sort();

  const filteredStories = successStories.filter(story => {
    const batchMatch = selectedBatch === "all" || story.batch === selectedBatch;
    const industryMatch = selectedIndustry === "all" || story.industry === selectedIndustry;
    return batchMatch && industryMatch;
  });

  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-blue-50"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Alumni Success Stories</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our graduates are making their mark across industries worldwide. From tech innovators to
            healthcare leaders, our alumni continue to inspire and achieve excellence in their chosen fields.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedBatch}
              onChange={e => setSelectedBatch(e.target.value)}
            >
              <option value="all">All Batches</option>
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedIndustry}
              onChange={e => setSelectedIndustry(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <svg className="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              <span className="text-gray-400">Loading success stories...</span>
            </div>
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span className="text-red-400">{error}</span>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No success stories found.</div>
          ) : (
            filteredStories.map((story) => (
              <Card key={story.id} className="bg-white/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-24 h-24 mb-4 relative">
                    <Image
                      src={story.photo}
                      alt={story.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1 text-center">{story.name}</h2>
                  <div className="text-sm text-blue-700 font-medium mb-1 text-center">{story.title}</div>
                  <div className="text-xs text-gray-500 mb-3 text-center">Batch {story.graduationYear} &bull; {story.industry}</div>
                  <div className="text-sm text-gray-600 text-center">{story.summary}</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}