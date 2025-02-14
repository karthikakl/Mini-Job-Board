"use client"; // Ensure it's a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Import useParams
import Layout from "@/components/ui/Layout";

// Define Job type
interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  salary: string;
  skill: string;
}

export default function IdJobs() {
  const { id } = useParams(); // Access job id using useParams
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // If there's no job id, return early

    // Fetch job details based on the jobId
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (res.ok) {
          const jobData: Job = await res.json();
          setJob(jobData);
        } else {
          throw new Error("Failed to fetch job details");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]); // Fetch job when id changes

  const handleApplyNow = () => {
    // Navigate to a page where the user can submit their application
    router.push(`/candidate/apply/${id}`);
  };

  return (
    <Layout>
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {loading ? (
        <p className="text-gray-400 text-xl">Loading job details...</p>
      ) : job ? (
        <div className="max-w-4xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <p className="text-xl mb-2"><strong>Location:</strong> {job.location}</p>
          <p className="text-xl mb-2"><strong>Description:</strong> {job.description}</p>
          <p className="text-xl mb-2"><strong>Salary:</strong> {job.salary}</p>
          <p className="text-xl mb-4"><strong>Skills Required:</strong> {job.skill}</p>
          
          {/* Apply Now Button */}
          <button 
            onClick={handleApplyNow} 
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-lg"
          >
            Apply Now
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-2xl">Job not found</p>
      )}
    </div>
    </Layout>
  );
}
