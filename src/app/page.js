import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-sky-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">SME Booking App</h1>
            <p className="mt-3 text-lg text-slate-600">A simple booking system for small businesses — schedule appointments and manage bookings quickly.</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/book" className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-sm font-semibold shadow">
                Book Appointment
              </Link>

              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 text-sm font-medium">
                Go to Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden md:flex w-44 h-44 flex-none items-center justify-center rounded-lg bg-linear-to-br from-blue-100 to-blue-300 text-blue-800 font-semibold shadow-inner">
            QuickBookings
          </div>
        </div>

        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600">
          <li className="flex items-start gap-3">
            <span className="mt-1 text-blue-600" aria-hidden>✓</span>
            <span className="text-slate-600">Fast scheduling</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-blue-600" aria-hidden>✓</span>
            <span className="text-slate-600">Manage clients</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-blue-600" aria-hidden>✓</span>
            <span className="text-slate-600">Calendar sync</span>
          </li>
        </ul>
      </div>
    </main>
  )
}