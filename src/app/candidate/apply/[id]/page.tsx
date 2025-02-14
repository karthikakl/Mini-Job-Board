"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Use useRouter to handle redirection
import Layout from "@/components/ui/Layout";

// Define the structure of the job object
interface Job {
  title: string;
  description: string;
  // Add other properties you expect in the job object
}

export default function ApplyJob() {
  const { id  } = useParams();  // Extract jobId from URL
  console.log('Job id from the URL:',id )
  const router = useRouter();  // Get the Next.js router
  const [job, setJob] = useState<Job | null>(null); // Explicitly type job as Job or null
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const jobData: Job = await res.json();  // Type the job data here as well
        console.log('Fetched Job Data:',jobData)
        setJob(jobData);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const applicationData = {
        jobId :id,
      name,
      email,
      resumeLink,
      coverLetter,
    };

    const res = await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(applicationData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Application submitted successfully!");
      router.push("/candidate/jobs");  // Redirect after successful application submission
    } else {
      alert("Error submitting application.");
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {loading ? (
        <p className="text-gray-400 text-xl">Loading job details...</p>
      ) : job ? (
        <div className="max-w-4xl w-full bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Apply for {job.title}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="text-xl">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="text-xl">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="resumeLink" className="text-xl">Resume Link</label>
              <input
                type="url"
                id="resumeLink"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="coverLetter" className="text-xl">Cover Letter</label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-lg"
            >
              Submit Application
            </button>
          </form>
        </div>
      ) : (
        <p className="text-gray-500 text-2xl">Job not found</p>
      )}
    </div>
    </Layout>
  );
}
