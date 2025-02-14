"use client"; // Mark as a client component

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/components/ui/Layout";

// Define Job type
type Job = {
  id: number;
  title: string;
  location: string;
  description: string;
  salary: string;
  skill: string;
};

export default function JobsCompany() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to load jobs");

        const data: Job[] = await res.json();
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* Header Section with Search Bar */}
      <div className="w-full max-w-5xl mb-6">
        <h1 className="text-3xl font-bold text-center mb-4">Company Job Listings</h1>
        <div className="flex justify-center">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400 text-xl">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-500 text-2xl font-semibold">No matching jobs found...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-gray-900 text-white p-4 shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Skills Required:</strong> {job.skill}</p>
                <div className="flex justify-between mt-4">
                  <a 
                    href={`/candidate/jobs/${job.id}`} 
                    className="bg-gray-950 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Apply
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
}
