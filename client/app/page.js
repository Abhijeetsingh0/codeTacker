import Link from "next/link"

export default function Home() {
    return (
      <div className="min-h-screen bg-zinc-150 text-zinc-950">
      <main className="relative container mx-auto py-20 mt-8 text-white">
        <div className="absolute inset-0 bg-[url('/back.jpg')] bg-contain blur-[2px] rounded-xl z-0"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-8">Welcome to CodeTracker</h2>
          <p className="text-2xl font-semibold mb-12">Your ultimate code repository solution, Free yourself from one coding platform and beyond.</p>
          <Link href="/auth/login" className="px-6 py-3 mt-8 text-xl font-semibold bg-emerald-500 rounded-full hover:bg-emerald-600">
            Get Started
          </Link>
        </div>
      </main>
    </div>
    
  );
}
