"use client";

import { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react"; // Hook to get session + signOut
import { useRouter } from "next/navigation";   
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // dropdown open state
  const menuRef = useRef(); // ref to detect clicks outside dropdown

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  // Fetch bookings after authentication
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => setBookings(Array.isArray(data) ? data : []));
    }
  }, [status]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-72 flex items-center justify-center p-6">
        <p className="text-slate-600 text-base">Checking login...</p>
      </div>
    );
  }

  if (!session) return null;

  const handleLogout = () => signOut({ callbackUrl: "/" });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Dashboard Header Section */}
      <section className="rounded-4xl border border-slate-800 bg-slate-950/95 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)] p-6 md:p-8 mb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Admin dashboard</p>
            <h1 className="mt-3 text-4xl font-extrabold text-white">Bookings overview</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Review recent appointments, check booking details, and jump back to the main booking flow with one click.
            </p>
          </div>

          {/* Right section: total bookings, back button, user dropdown */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center relative" ref={menuRef}>
            <div className="rounded-3xl bg-slate-900 border border-slate-800 px-5 py-4 text-center shadow-sm">
              <p className="text-sm uppercase text-slate-400">Total bookings</p>
              <p className="mt-2 text-3xl font-semibold text-white">{bookings.length}</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Back to main
            </Link>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="ml-3 inline-flex items-center gap-2 rounded-3xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
              >
                {session.user.name}
                <span className="ml-1">▾</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-3xl shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-slate-800 rounded-3xl"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-10 text-center text-slate-300 shadow-lg">
          <p className="text-xl font-semibold text-white">No bookings yet</p>
          <p className="mt-3 text-sm text-slate-400">
            Your booking list is empty. Head back to the homepage to create the first appointment.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <article
              key={b.id || b._id || `${b.name}-${b.date}-${b.time}`}
              className="group rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.9)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white truncate">{b.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{b.service || "Service details"}</p>
                </div>
                <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-sky-300">
                  {b.status || "Confirmed"}
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <p className="text-slate-400">Date</p>
                  <p className="mt-1 font-medium text-white">{b.date}</p>
                </div>
                <div className="rounded-2xl bg-slate-900/80 p-4">
                  <p className="text-slate-400">Time</p>
                  <p className="mt-1 font-medium text-white">{b.time}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}