import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Application = {
  id: string;
  name: string;
  email: string;
  resumeLink?: string;
  coverLetter?: string;
  appliedAt: string;
};

export default function ApplicationJobs() {
  const { id } = useParams(); // This is the selected job ID
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<any | null>(null);

  // Fetch job details
  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const jobRes = await fetch(`/api/jobs/${id}`);
        if (jobRes.ok) {
          const jobData = await jobRes.json();
          setJob(jobData);
        } else {
          console.error("Error fetching job:", jobRes.status);
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        setJob(null);
      }
    };

    fetchJob();
  }, [id]);

  // Fetch applications related to the job
  useEffect(() => {
    if (!id) return;

    const fetchApplications = async () => {
      try {
        const res = await fetch(`/api/application/${id}`); // Fetch applications for this job only
        if (res.ok) {
          const data: Application[] = await res.json();
          setApplications(data);
        } else {
          const errorData = await res.json();
          throw new Error(`Failed to fetch: ${res.status} - ${errorData?.message || res.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  // Handle deleting the job
  const handleDeleteJob = async () => {
    try {
      const deleteRes = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (deleteRes.ok) {
        router.push("/jobs"); // Redirect to jobs list after successful deletion
      } else {
        console.error("Error deleting job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Handle editing the job (navigate to the edit page)
  const handleEditJob = () => {
    router.push(`/jobs/${id}/edit`);
  };

  // Handle viewing an application
  const handleViewApplication = (applicationId: string) => {
    router.push(`/applications/${applicationId}`);
  };

  if (loading) {
    return <p className="text-gray-400 text-xl">Loading...</p>;
  }

  if (!job) {
    return <p className="text-red-500">Error loading job details.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">{job.title}</h1>
      
      {/* Job Actions: Edit & Delete */}
      <div className="text-center mb-6">
        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-4 hover:bg-blue-700"
          onClick={handleEditJob}
        >
          Edit Job
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
          onClick={handleDeleteJob}
        >
          Delete Job
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Applications</h2>
        {applications.length === 0 ? (
          <p className="text-gray-500 text-xl text-center">No applications yet</p>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <Card key={application.id} className="bg-gray-800 text-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{application.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Email:</strong> {application.email}</p>
                  {application.resumeLink && (
                    <p>
                      <strong>Resume:</strong>{" "}
                      <a
                        href={application.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View Resume
                      </a>
                    </p>
                  )}
                  {application.coverLetter && <p><strong>Cover Letter:</strong> {application.coverLetter}</p>}
                  <p>
                    <strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}
                  </p>
                  {/* View Application Button */}
                  <button
                    onClick={() => handleViewApplication(application.id)}
                    className="bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-700"
                  >
                    View Application
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
