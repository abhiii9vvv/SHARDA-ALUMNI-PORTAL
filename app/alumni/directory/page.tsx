'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabase/client";

interface Alumni {
  id: string;
  name: string;
  graduationYear: number;
  degree: string;
  location: string;
  company: string;
  photo: string;
}

export default function AlumniDirectoryPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("users")
          .select("id, first_name, last_name, graduation_year, degree, location, company, image")
          .order("graduation_year", { ascending: false });
        if (error) {
          setError("Failed to load alumni.");
        } else {
          setAlumni(
            (data || []).map((a: any) => ({
              id: a.id,
              name: `${a.first_name || ""} ${a.last_name || ""}`.trim(),
              graduationYear: a.graduation_year,
              degree: a.degree,
              location: a.location,
              company: a.company,
              photo: a.image || "/images/alumni-placeholder.png",
            }))
          );
        }
      } catch (err) {
        setError("Failed to load alumni.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const filtered = alumni.filter((alum) =>
    alum.name.toLowerCase().includes(search.toLowerCase()) ||
    alum.degree.toLowerCase().includes(search.toLowerCase()) ||
    alum.company.toLowerCase().includes(search.toLowerCase()) ||
    alum.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Alumni Directory</h1>
        <div className="flex justify-center mb-8">
          <Input
            type="text"
            placeholder="Search by name, degree, company, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md w-full shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <svg className="animate-spin h-8 w-8 text-blue-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              <span className="text-gray-400">Loading alumni...</span>
            </div>
          ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
              <span className="text-red-400">{error}</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No alumni found.</div>
          ) : (
            filtered.map((alum) => (
              <Card key={alum.id} className="bg-white/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-24 h-24 mb-4 relative">
                    <Image
                      src={alum.photo}
                      alt={alum.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{alum.name}</h2>
                  <div className="text-sm text-gray-600 mb-1">{alum.degree} ({alum.graduationYear})</div>
                  <div className="text-sm text-blue-700 font-medium mb-1">{alum.company}</div>
                  <div className="text-xs text-gray-500">{alum.location}</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}