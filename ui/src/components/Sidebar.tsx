import type { LucideIcon } from 'lucide-react';
import { Home, Folder, GitBranch, Activity, ShieldAlert, Bot, CheckCircle, FileText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SidebarItem {
  title: string;
  icon: LucideIcon;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Overview', icon: Home, path: '/' },
  { title: 'Projects', icon: Folder, path: '/projects' },
  { title: 'Repositories', icon: GitBranch, path: '/repositories' },
  { title: 'Analysis Runs', icon: Activity, path: '/analysis' },
  { title: 'Security Findings', icon: ShieldAlert, path: '/security' },
  { title: 'AI Intelligence', icon: Bot, path: '/ai' },
  { title: 'Acceptance', icon: CheckCircle, path: '/acceptance' },
  { title: 'Reports', icon: FileText, path: '/reports' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 py-6">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
