import Link from "next/link";

export default function JobsCompany() {
  return (
    <div className="min-h-screen bg-gradient-to-b  to-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-4">Welcome to the Company Hub</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-xl">
        Connect with top talent and build your dream team. Post jobs, review applications, and find the best fit for your company.
      </p>

      {/* Company Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">View Existing Jobs</h2>
          <p className="text-gray-400">Check your listed job openings.</p>
          <Link href="/company/jobs">
            <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg">
              View Jobs
            </button>
          </Link>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Post a New Job</h2>
          <p className="text-gray-400">List new job openings and attract candidates.</p>
          <Link href="/company/jobs/new">
            <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg">
              Post Job
            </button>
          </Link>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">View Applicants</h2>
          <p className="text-gray-400">See and manage job applications.</p>
          <Link href="/company/jobs">
            <button className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg">
              View Applicants
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
