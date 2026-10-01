// apps/web/src/components/header.tsx
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/sprints" className="font-extrabold text-lg text-slate-900 tracking-tight">
            🚀 DVT Learning Path
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link href="/sprints" className="hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/daily-updates" className="hover:text-blue-600 transition-colors">
              Daily Updates
            </Link>
            <Link href="/tasks" className="hover:text-blue-600 transition-colors">
              Tasks
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
            Developer Portal
          </span>
        </div>
      </div>
    </header>
  );
}