"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SuccessStoriesClient() {
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      title: "Senior Software Engineer at Google",
      photo: "/images/alumni-priya.jpg",
      summary:
        "From a computer science graduate to leading innovative projects at Google. Sharda University provided me with the foundation and confidence to pursue my dreams in tech.",
      graduationYear: "2018",
      industry: "Technology",
      batch: "2018",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      title: "Founder & CEO, TechStart Solutions",
      photo: "/images/alumni-rajesh.jpg",
      summary:
        "My entrepreneurial journey began at Sharda University. The business incubation program and mentorship helped me build a successful startup that now employs 200+ people.",
      graduationYear: "2016",
      industry: "Entrepreneurship",
      batch: "2016",
    },
    {
      id: 3,
      name: "Dr. Anita Verma",
      title: "Chief Medical Officer, Apollo Hospitals",
      photo: "/images/alumni-anita.jpg",
      summary:
        "The medical program at Sharda University shaped my career in healthcare. Today, I'm proud to lead medical innovations that impact thousands of lives daily.",
      graduationYear: "2015",
      industry: "Healthcare",
      batch: "2015",
    },
    {
      id: 4,
      name: "Vikram Singh",
      title: "Investment Director, Goldman Sachs",
      photo: "/images/alumni-vikram.jpg",
      summary:
        "The finance program and industry connections at Sharda University opened doors to Wall Street. Now I manage multi-billion dollar portfolios and mentor young professionals.",
      graduationYear: "2017",
      industry: "Finance",
      batch: "2017",
    },
    {
      id: 5,
      name: "Meera Patel",
      title: "Creative Director, Ogilvy & Mather",
      photo: "/images/alumni-meera.jpg",
      summary:
        "Sharda University nurtured my creative talents and provided the perfect platform to explore advertising. Today, I lead campaigns for global brands and inspire the next generation.",
      graduationYear: "2019",
      industry: "Advertising",
      batch: "2019",
    },
    {
      id: 6,
      name: "Amit Joshi",
      title: "Lead Data Scientist, Infosys",
      photo: "/images/alumni-amit.jpg",
      summary:
        "Sharda's focus on analytics and real-world projects gave me the skills to excel in data science. Now, I lead a team solving complex business problems with AI.",
      graduationYear: "2020",
      industry: "Technology",
      batch: "2020",
    },
    {
      id: 7,
      name: "Sonal Kapoor",
      title: "Head of Marketing, Unilever India",
      photo: "/images/alumni-sonal.jpg",
      summary:
        "The vibrant campus life and leadership opportunities at Sharda shaped my marketing career. Today, I drive brand strategy for one of the world's largest FMCG companies.",
      graduationYear: "2014",
      industry: "Marketing",
      batch: "2014",
    },
    {
      id: 8,
      name: "Mohit Sinha",
      title: "Senior Architect, Larsen & Toubro",
      photo: "/images/alumni-mohit.jpg",
      summary:
        "Sharda's architecture program encouraged creativity and innovation. My designs now shape skylines across India.",
      graduationYear: "2013",
      industry: "Architecture",
      batch: "2013",
    },
    {
      id: 9,
      name: "Fatima Khan",
      title: "Research Scientist, CSIR",
      photo: "/images/alumni-fatima.jpg",
      summary:
        "The research culture at Sharda University inspired my passion for discovery. I now contribute to cutting-edge scientific advancements in India.",
      graduationYear: "2012",
      industry: "Research",
      batch: "2012",
    },
    {
      id: 10,
      name: "Rohan Mehta",
      title: "Product Manager, Flipkart",
      photo: "/images/alumni-rohan.jpg",
      summary:
        "Sharda's entrepreneurial spirit and tech focus helped me launch my career in product management. I now lead teams building India's top e-commerce experiences.",
      graduationYear: "2021",
      industry: "E-commerce",
      batch: "2021",
    },
  ];

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
          {filteredStories.slice(0, 3).map((story) => (
            <Card
              key={story.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      src={story.photo}
                      alt={`Photo of ${story.name}, ${story.title}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm leading-5 font-medium text-gray-900">{story.name}</h3>
                    <div className="text-sm leading-5 text-gray-500">{story.title}</div>
                  </div>
                </div>
                <div className="mt-2 text-base leading-6 text-gray-700">{story.summary}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 