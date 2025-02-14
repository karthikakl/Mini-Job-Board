"use client"; // Mark as a client component

import Link from "next/link"; 
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import CompanyHeader from "@/components/companyHeader";

// Define Job type
type Job = {
  id: string; // Ensure the ID is a string if your API expects a UUID
  title: string;
  location: string;
  description: string;
  salary: string;
  skill: string;
};

export default function JobsCompany() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  // Handle job deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");

      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Handle edit button click - Open modal
  const handleEditClick = (job: Job) => {
    setSelectedJob(job);
    setIsEditOpen(true);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedJob) return;
    setSelectedJob({ ...selectedJob, [e.target.name]: e.target.value });
  };

  // Handle job update
  const handleUpdate = async () => {
    if (!selectedJob) return;
    try {
      console.log("Updating job with ID:", selectedJob.id);
      const res = await fetch(`/api/jobs/${selectedJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedJob),
      });

      if (!res.ok) throw new Error("Failed to update job");

      setJobs(jobs.map((job) => (job.id === selectedJob.id ? selectedJob : job)));
      setIsEditOpen(false); // Close modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
       
      {loading ? (
        <p className="text-gray-400 text-xl">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 text-2xl font-semibold">No jobs or openings at the moment</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Company Job Listings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {jobs.map((job) => (
              <Card key={job.id} className="bg-gray-900 text-white p-4 shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>
                  <p><strong>Skills Required:</strong> {job.skill}</p>
                  <div className="flex justify-between mt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleEditClick(job)}>Edit</Button>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(job.id)}>Delete</Button>
                  </div>
                  {/* View Applicants Button */}
                  <Link href={`/company/jobs/${job.id}/applications`}>
                    <Button className="bg-green-600 hover:bg-green-700 mt-4">
                      View Applicants
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Edit Job Modal */}
      {selectedJob && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent
            className="bg-gray-800 text-white p-6 rounded-lg"
            aria-describedby="dialog-description"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Job</DialogTitle>
            </DialogHeader>
            <div id="dialog-description" className="space-y-4">
              <Input
                name="title"
                value={selectedJob.title}
                onChange={handleInputChange}
                placeholder="Job Title"
                className="bg-gray-700 text-white"
              />
              <Input
                name="location"
                value={selectedJob.location}
                onChange={handleInputChange}
                placeholder="Location"
                className="bg-gray-700 text-white"
              />
              <Textarea
                name="description"
                value={selectedJob.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="bg-gray-700 text-white"
              />
              <Input
                name="salary"
                value={selectedJob.salary}
                onChange={handleInputChange}
                placeholder="Salary"
                className="bg-gray-700 text-white"
              />
              <Input
                name="skill"
                value={selectedJob.skill}
                onChange={handleInputChange}
                placeholder="Skills"
                className="bg-gray-700 text-white"
              />
            </div>
            <DialogFooter className="flex justify-end space-x-2 mt-4">
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setIsEditOpen(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
    
  );
}
