'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/transactions', icon: ArrowLeftRight, label: 'Transações' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-60 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 min-h-screen transition-colors">
      <div className="px-6 h-16 flex items-center border-b border-slate-100 dark:border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <Wallet className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-lg tracking-tight">Finanza</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
            )}
          >
            <Icon className={cn('h-4 w-4', pathname === href ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500')} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
