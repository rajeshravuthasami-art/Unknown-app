import Link from 'next/link';
import { LayoutDashboard, Bug, LineChart, History, FileText, Settings } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Bug, label: 'Error Assistant', href: '/dashboard/error-assistant' },
    { icon: LineChart, label: 'Data Analyzer', href: '/dashboard/data-analyzer' },
    { icon: History, label: 'History', href: '/dashboard/history' },
    { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <aside className="w-64 glass-panel h-screen border-r border-white/10 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <Link href="/" className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Streducer AI
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          <span className="text-sm">John Doe</span>
        </div>
      </div>
    </aside>
  );
}
