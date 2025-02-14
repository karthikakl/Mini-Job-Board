import Link from "next/link"; // Import Link

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="w-full py-6 bg-foreground text-background shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <div className="flex">
            <h1 className="text-xl font-bold text-cyan-100">Job Portal</h1>
          </div>

          <nav className="space-x-8">
            <Link href="/candidate" className="text-sm text-cyan-100 sm:text-lg hover:underline">
              Careers
            </Link>
            <Link href="/" className="text-sm text-cyan-100 sm:text-lg hover:underline">
              Services
            </Link>
            <Link href="/" className="text-sm text-cyan-100 sm:text-lg hover:underline">
              About Us
            </Link>
            <Link href="/" className="text-sm sm:text-lg text-cyan-100 hover:underline">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-8 max-w-4xl">
          {/* Slogan and Message Section */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Your Future Begins Here
          </h1>
          <p className="mt-4 text-lg text-cyan-100">
            A world of endless possibilities is waiting for you. Don’t wait for the perfect moment—create it!
          </p>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-dark-gray py-6 text-white text-center">
        <div className="max-w-7xl mx-auto">
          <p>&copy; 2025 JobBoard, All Rights Reserved.</p>
          <div className="mt-4">
            <Link href="/" className="mx-2 hover:underline">
              Privacy
            </Link>
            <Link href="/" className="mx-2 hover:underline">
              Terms
            </Link>
            <Link href="/" className="mx-2 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
