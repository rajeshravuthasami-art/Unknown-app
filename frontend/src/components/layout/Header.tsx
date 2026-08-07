import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="h-16 glass border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <Input placeholder="Search..." className="pl-10 h-10 bg-white/5 border-none" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
          <Bell size={20} className="text-white/70" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <UserButton />
      </div>
    </header>
  );
}
