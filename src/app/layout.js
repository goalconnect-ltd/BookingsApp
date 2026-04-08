import PropTypes from "prop-types";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SME Booking App",
  description: "Simple booking app for SMEs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                GC
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold">SME Booking App</h1>
                <p className="text-xs md:text-sm text-slate-300">Powered by GoalConnect</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/book" className="hover:text-blue-400 transition-colors">
                Book
              </Link>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden border-t border-slate-700">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-around text-sm font-medium">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/book" className="hover:text-blue-400 transition-colors">
                Book
              </Link>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-slate-800 text-white mt-12">
          <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">SME Booking App</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                A simple appointment booking solution for small businesses to manage customers and bookings easily.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="hover:text-white">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm text-slate-300">Email: goalconltd@gmail.com</p>
              <p className="text-sm text-slate-300 mt-2">Built by GoalConnect Ltd</p>
            </div>
          </div>

          <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
            © {new Date().getFullYear()} SME Booking App. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
