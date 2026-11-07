'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { usePrepresumeStore } from '@/lib/store';
import {
  FileText,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Layers,
  Crown,
  User,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  ChevronDown,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    currentUser,
    isAuthenticated,
    entitlement,
    logout,
    switchToAdmin,
    switchToUser,
  } = usePrepresumeStore();

  const isSubscribed =
    entitlement.isSubscribed &&
    entitlement.subscriptionExpiresAt &&
    new Date(entitlement.subscriptionExpiresAt).getTime() > Date.now();

  const navLinks = [
    { title: 'Resume Builder', href: '/builder', icon: FileText },
    { title: 'ATS Checker', href: '/ats-checker', icon: ShieldCheck },
    { title: 'AI Assistant', href: '/ai-writer', icon: Sparkles },
    { title: '108+ Templates', href: '/templates', icon: Layers },
    { title: 'India Jobs', href: '/jobs', icon: Briefcase },
    { title: 'Pricing (₹19)', href: '/pricing', icon: Crown, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-lg tracking-wider shadow-sm group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-none text-foreground flex items-center gap-1.5">
                {siteConfig.name}
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/20">
                  India
                </span>
              </span>
              <span className="text-[11px] text-muted-foreground font-medium hidden sm:inline">
                AI Resume & Career Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-secondary text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  } ${item.highlight ? 'text-accent font-semibold' : ''}`}
                >
                  <Icon className={`h-4 w-4 ${item.highlight ? 'text-accent' : ''}`} />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Entitlement Badge */}
          <div className="hidden md:flex items-center">
            {isSubscribed ? (
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 text-xs py-1">
                <Zap className="h-3 w-3 fill-emerald-500 text-emerald-500" />
                Active ₹19 Pass
              </Badge>
            ) : entitlement.hasFreeExportAvailable ? (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 text-xs py-1">
                1 Free Export Available
              </Badge>
            ) : (
              <Link href="/pricing">
                <Button size="sm" variant="outline" className="h-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs font-semibold">
                  Get ₹19 Pass
                </Button>
              </Link>
            )}
          </div>

          <ThemeSwitcher />

          {/* User Account / Auth Dropdown */}
          {isAuthenticated && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 px-2.5 gap-2 border border-border/60">
                  <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline max-w-[100px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-foreground truncate">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                    <div className="flex items-center gap-1 pt-1">
                      <span className="text-[10px] font-mono uppercase px-1 py-0.5 rounded bg-muted text-muted-foreground">
                        {currentUser.role === 'super_admin' ? 'Super Admin' : 'Candidate'}
                      </span>
                      {currentUser.authIdentities.map((id) => (
                        <span key={id} className="text-[10px] font-mono capitalize px-1 py-0.5 rounded bg-secondary text-secondary-foreground">
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <Layers className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Master Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pricing" className="cursor-pointer">
                    <Crown className="h-4 w-4 mr-2 text-accent" />
                    Subscription (₹19)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* Role Switcher Demo Control */}
                {currentUser.role === 'super_admin' ? (
                  <DropdownMenuItem onClick={switchToUser} className="cursor-pointer text-blue-600">
                    <User className="h-4 w-4 mr-2" />
                    Switch to Candidate View
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={switchToAdmin} className="cursor-pointer text-amber-600">
                    <ShieldAlert className="h-4 w-4 mr-2" />
                    Switch to Super Admin
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild>
                  <Link href="/admin" className="cursor-pointer font-medium text-foreground">
                    <ShieldAlert className="h-4 w-4 mr-2 text-primary" />
                    Super Admin Console
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="h-9 text-xs sm:text-sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm font-semibold gap-1.5 shadow-sm">
                  Get Started <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-secondary"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start text-sm">
                <Layers className="h-4 w-4 mr-2" /> Candidate Dashboard
              </Button>
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start text-sm text-primary font-medium">
                <ShieldAlert className="h-4 w-4 mr-2" /> Super Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
