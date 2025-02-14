import Link from "next/link";

export default function CompanyHeader() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold">Company Dashboard</h1>

        {/* Navigation Menu */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/company/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/company/post-job" className="hover:text-gray-400">
                Post a Job
              </Link>
            </li>
            <li>
              <Link href="/company/applications" className="hover:text-gray-400">
                View Applications
              </Link>
            </li>
            <li>
              <Link href="/company/profile" className="hover:text-gray-400">
                Company Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
