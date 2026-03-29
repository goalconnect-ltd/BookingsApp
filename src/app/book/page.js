"use client";
import { useState } from "react";
import Link from "next/link";

export default function BookingPage() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setMessage(null);
        if (!name.trim() || !date || !time) {
            setMessage({ type: "error", text: "Please fill out all fields." });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim(), date, time }),
            });

            if (!res.ok) throw new Error("Failed to submit booking");

            setMessage({ type: "success", text: "Booking submitted!" });
            setName("");
            setDate("");
            setTime("");
        } catch (err) {
            setMessage({ type: "error", text: err.message || "Submission failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <div className="flex items-center mb-6">
                <Link href="/" className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded mr-4">Back to Home</Link>
                <h2 className="text-3xl font-bold">Book Appointment</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-6">
                <p className="text-gray-600 mb-4">Choose a date and time for your appointment.</p>

                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Full name</label>
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="border rounded p-2 w-full text-gray-900 placeholder-gray-500 mb-4"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">Date</label>
                        <input
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            className="border rounded p-2 w-full text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700">Time</label>
                        <input
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            type="time"
                            className="border rounded p-2 w-full text-gray-900 placeholder-gray-500"
                        />
                    </div>
                </div>

                {message && (
                    <div className={`mb-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                        {message.text}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Booking"}
                    </button>

                    <Link href="/" className="inline-block px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Cancel</Link>
                </div>
            </form>
        </div>
    );
}