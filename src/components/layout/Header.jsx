import { Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-[#9ED8B5]/55 bg-[#0B0D10] text-[#F5F7FA]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="text-lg font-bold tracking-tight text-[#F5F7FA]">
          CurateCV
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#262C36] bg-[#111418] px-3 py-2 text-xs font-medium text-[#F5F7FA] transition-colors hover:border-[#3DBB78] hover:bg-[#171B21] focus:outline-none focus:ring-2 focus:ring-[#3DBB78]"
          >
            <LockKeyhole className="h-3.5 w-3.5 text-[#9EA7B3]" aria-hidden="true" />
            Sign in
          </Link>
          <Link
            to="/signin"
            className="inline-flex items-center justify-center rounded-lg bg-[#3DBB78] px-3 py-2 text-xs font-semibold text-[#06140D] transition-colors hover:bg-[#35A86B] focus:outline-none focus:ring-2 focus:ring-[#3DBB78]"
          >
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}