import Link from "next/link";

export default function Candidate() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-600 to-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dream Job Hub</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-xl">
        Unlock amazing career opportunities. Browse job listings, submit applications, and take the next step in your career.
      </p>

      {/* Centered Explore Jobs Section */}
      <div className="flex justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Explore Jobs</h2>
          <p className="text-gray-400">Find the best job opportunities tailored for you.</p>
          <Link href="/candidate/jobs">
            <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg">
              Browse Jobs
            </button>
          </Link>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-10 text-center max-w-xl">
        <h2 className="text-2xl font-bold text-white mb-3">Your Dream Job Awaits!</h2>
        <p className="text-gray-300">
          Take the first step towards a bright future. Apply for your dream job today!
        </p>
      </div>
    </div>
  );
}
