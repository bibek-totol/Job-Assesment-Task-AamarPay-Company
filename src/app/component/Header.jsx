"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const {user,logOut} = useApp();

  const nav = [
    { name: "Home", href: "/" },
    { name: "Create Event", href: "/create-event" },
    { name: "My Events", href: "/my-events" },
   
  ];

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="sticky top-4 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="relative flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-xl transition  dark:bg-neutral-900/60"
        >
          
          <span className=" absolute inset-0 rounded-2xl [background:radial-gradient(60%_50%_at_50%_20%,rgba(99,102,241,0.15)_0%,rgba(99,102,241,0)_70%),radial-gradient(60%_50%_at_20%_80%,rgba(56,189,248,0.15)_0%,rgba(56,189,248,0)_70%),radial-gradient(60%_50%_at_80%_80%,rgba(16,185,129,0.15)_0%,rgba(16,185,129,0)_70%)]"></span>

      
          <Link href="/" className="relative z-10 flex items-center gap-2 rounded-xl px-3 py-2 focus:outline-2  focus:outline-indigo-400/60 active: scale-95">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 text-white shadow-md">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="">
              <p className="text-sm font-semibold tracking-wide text-neutral-200 dark:text-neutral-100">Eventify</p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-400">Plan. Host. Manage.</p>
            </div>
          </Link>

      
          <nav className="relative z-10 hidden items-center gap-1 md:flex ">
            {nav.map((item) => (
              <NavItem  key={item.href} href={item.href} active={isActive(item.href)}>
                <span className="text-white">{item.name}</span>
              </NavItem>
            ))}

            {
              user ? 
              <button
              
    onClick={logOut}
    className="group relative hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60  rounded-xl px-3 py-2 text-sm font-medium text-white hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
  >
    Logout
  </button>
              :
              (
                <>
                <NavItem  href="/login" active={isActive("/login")}>
                <span className="text-white">Login</span>
              </NavItem>
              <NavItem  href="/register" active={isActive("/register")}>
                <span className="text-white">Register</span>
              </NavItem>
                </>
              
              )
            }


          </nav>

          
          <button
            onClick={() => setOpen((s) => !s)}
            className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/70 bg-white/10 shadow-sm backdrop-blur-md transition hover:scale-[1.02] active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          
          <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px rounded-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800" />
        </div>

        
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mt-2overflow-hidden rounded-2xl border border-white/20 bg-neutral-900/60 shadow-lg backdrop-blur-xl dark:border-neutral-800/60 dark:bg-neutral-900/70 md:hidden"
            >
              <div className="p-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-indigo-500/10 via-sky-400/10 to-emerald-400/10 ring-1 ring-indigo-400/30"
                        : "hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
                    } group relative mb-1 flex items-center justify-between rounded-xl px-3 py-3 transition `}
                  >
                    <span className="text-sm font-medium  text-white  transition group-hover:translate-x-0.5 dark:text-neutral-100">
                      {item.name}
                    </span>
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="dot"
                        className="h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400"
                      />
                    )}
                  </Link>


                ))}

                {
                  user ? 
                  <button
                  onClick={logOut}
                  className="group relative flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60"
                >
                  <span className="text-sm font-medium  text-white  transition group-hover:translate-x-0.5 dark:text-neutral-100">
                    Logout
                  </span>
                </button>
                :
                (
                  <>
                  <button className="group relative flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60">
                  <span className="text-sm font-medium  text-white  transition group-hover:translate-x-0.5 dark:text-neutral-100">
                    Login
                  </span>
                </button>
                <button className="group relative flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60">
                  <span className="text-sm font-medium  text-white  transition group-hover:translate-x-0.5 dark:text-neutral-100">
                    Register
                  </span>
                </button>
                  </>
                )
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function NavItem({ href, active, children }) {
  return (
    <Link
      href={href}
      className="group relative rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 dark:text-neutral-300 dark:hover:text-white"
    >
      <span className="relative z-10">{children}</span>

      {/* Hover background */}
      <span className="absolute inset-0 rounded-xl bg-neutral-200/50 opacity-0 transition group-hover:opacity-100 dark:bg-neutral-800/60" />

      {/* Active pill highlight */}
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="active-pill"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/15 via-sky-400/15 to-emerald-400/15 ring-1 ring-indigo-400/30"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </AnimatePresence>

      {/* Animated underline */}
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="underline"
            className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
