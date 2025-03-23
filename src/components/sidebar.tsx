import { signOut } from 'next-auth/react';
import Link from "next/link";
import { Home, CheckSquare, Users, User, LogOut } from 'lucide-react';

export default function AppSidebar() {
  return (
    <aside className="menu p-4 w-80 h-screen bg-base-200 text-base-content text-xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl font-bold">PMA</span>
      </div>
      <ul className='space-y-4'>
        <li>
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-5 h-5" /> {/* Lucide Home Icon */}
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/task" className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5" /> {/* Lucide CheckSquare Icon */}
            Tasks
          </Link>
        </li>
        <li>
          <Link href="/team" className="flex items-center gap-2">
            <Users className="w-5 h-5" /> {/* Lucide Users Icon */}
            Team Management
          </Link>
        </li>
        <li>
          <Link href="/account" className="flex items-center gap-2">
            <User className="w-5 h-5" /> {/* Lucide User Icon */}
            Account
          </Link>
        </li>
        <li>
          <button className="flex items-center gap-2" onClick={() => void signOut()}>
            <LogOut className="w-5 h-5" /> {/* Lucide LogOut Icon */}
            Log out
          </button>
        </li>
      </ul>
    </aside>
  );
}