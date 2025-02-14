"use client"; 

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  id: string;
  title: string; 
}

type Application = {
  id: string;
  name: string;
  email: string;
  resumeLink?: string;
  coverLetter?: string;
  appliedAt: string;
};

export default function ApplicationJobs() {
  const { id: jobId } = useParams(); 
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null); 

  // Fetching the job details using jobId
  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const jobRes = await fetch(`/api/jobs/${jobId}`);
        if (jobRes.ok) {
          const jobData = await jobRes.json();
          setJob(jobData);
        } else {
          console.error("Error fetching job:", jobRes.status, jobRes.statusText);
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setJob(null);
      }
    };

    fetchJob();
  }, [jobId]);

  // Fetching applications for the given jobId
  useEffect(() => {
    if (!jobId) return;

    const fetchApplications = async () => {
      try {
        const res = await fetch(`/api/applications/${jobId}`);
        if (res.ok) {
          const data: Application[] = await res.json();
          setApplications(data);
        } else {
          console.error("Error fetching applications:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {loading ? (
        <p className="text-gray-400 text-xl">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500 text-2xl font-semibold">No applications yet</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">
            Applicants for {job ? job.title : "Job"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {applications.map((application) => (
              <Card key={application.id} className="bg-gray-900 text-white p-4 shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{application.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Email:</strong> {application.email}</p>
                  {application.resumeLink?.trim() && (
                    <p>
                      <strong>Resume:</strong> 
                      <a href={application.resumeLink} target="_blank" className="text-blue-400 hover:underline">
                        View Resume
                      </a>
                    </p>
                  )}
                  {application.coverLetter?.trim() && (
                    <p><strong>Cover Letter:</strong> {application.coverLetter}</p>
                  )}
                  <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
