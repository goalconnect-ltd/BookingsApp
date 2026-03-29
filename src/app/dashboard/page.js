"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch("/api/bookings")
            .then((res) => res.json())
            .then((data) => setBookings(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div className="p-6">
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-extrabold">Dashboard</h1>
                    <p className="text-sm text--700">Booking Details</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text--700">Total: <strong>{bookings.length}</strong></span>
                    <Link href="/" className="inline-flex items-center px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md text-sm hover:bg-gray-600">
                        Back to main
                    </Link>
                </div>
            </header>

            {bookings.length === 0 ? (
                <div className="rounded-lg p-6 border-dashed border-2 border-gray-200 text-center text-gray-600">
                    No bookings yet. Create one from the main page.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((b) => (
                        <div key={b.id || b._id || `${b.name}-${b.date}-${b.time}`} className="bg-white shadow-sm rounded-lg p-4">
                            <h2 className="font-semibold text-lg text-gray-700 truncate">{b.name}</h2>
                            <p className="text-sm text-gray-500">{b.service || "Service"}</p>
                            <div className="mt-3 text-sm text-gray-700">
                                <p><strong>Date:</strong> {b.date}</p>
                                <p><strong>Time:</strong> {b.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}