"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewJobs() {
  const router = useRouter(); 
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    skill: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error("Failed to post job");

      alert("Job posted successfully!");
      setJobData({ title: "", salary: "", location: "", description: "", skill: "" });

      
      router.push("/company/jobs/");
    } catch (error) {
      console.error(error);
      alert("Error posting job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <Card className="w-full max-w-lg shadow-lg bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full bg-gray-800 text-white"
            />

            <Input
              type="text"
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="w-full bg-gray-800 text-white"
            />

            <Input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              placeholder="Location (Remote / On-site)"
              className="w-full bg-gray-800 text-white"
            />

            <Textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              placeholder="Job Description"
              className="w-full bg-gray-800 text-white"
            />

            <Input
              type="text"
              name="skill"
              value={jobData.skill}
              onChange={handleChange}
              placeholder="Required Skills (e.g., React, Node.js, Python)"
              className="w-full bg-gray-800 text-white"
            />

            <Button type="submit" disabled={loading} className="w-full bg-white hover:bg-gray-700 text-black">
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
