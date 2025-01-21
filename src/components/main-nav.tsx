"use client"

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { NavItem } from '@/types'

const navItems: NavItem[] = [
  {
    title: '首页',
    href: '/',
  },
  {
    title: '文章',
    href: '/posts',
  },
  {
    title: '分类',
    href: '/categories',
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          个人博客
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === item.href
                ? 'text-foreground'
                : 'text-foreground/60'
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
} 