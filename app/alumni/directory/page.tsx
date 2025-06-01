import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const alumniData = [
  {
    id: 1,
    name: "Priya Sharma",
    graduationYear: 2018,
    degree: "B.Tech Computer Science",
    location: "Bangalore, India",
    company: "Google",
    photo: "/images/alumni-priya.jpg",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    graduationYear: 2016,
    degree: "MBA Marketing",
    location: "Delhi, India",
    company: "TechStart Solutions",
    photo: "/images/alumni-rajesh.jpg",
  },
  {
    id: 3,
    name: "Anita Verma",
    graduationYear: 2015,
    degree: "MBBS",
    location: "Mumbai, India",
    company: "Apollo Hospitals",
    photo: "/images/alumni-anita.jpg",
  },
  {
    id: 4,
    name: "Vikram Singh",
    graduationYear: 2017,
    degree: "B.Com Finance",
    location: "London, UK",
    company: "Goldman Sachs",
    photo: "/images/alumni-vikram.jpg",
  },
  {
    id: 5,
    name: "Meera Patel",
    graduationYear: 2019,
    degree: "BA Advertising",
    location: "Ahmedabad, India",
    company: "Ogilvy & Mather",
    photo: "/images/alumni-meera.jpg",
  },
  {
    id: 6,
    name: "Amit Joshi",
    graduationYear: 2020,
    degree: "M.Sc Data Science",
    location: "Pune, India",
    company: "Infosys",
    photo: "/images/alumni-amit.jpg",
  },
];

export default function AlumniDirectoryPage() {
  const [search, setSearch] = useState("");
  const filtered = alumniData.filter((alum) =>
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
          {filtered.length === 0 ? (
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