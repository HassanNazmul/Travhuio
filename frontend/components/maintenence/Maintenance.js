"use client";

import React, { useState, useEffect } from "react";
import { FaPlaneDeparture, FaEnvelope } from "react-icons/fa";

const MaintenanceComponent = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);

    function getRandomTime() {
        // Generate a random time between 1 hour and 48 hours (in seconds)
        return Math.floor(Math.random() * (48 * 60 * 60 - 1 * 60 * 60 + 1)) + 1 * 60 * 60;
    }

    useEffect(() => {
        setHasMounted(true); // Mark as mounted after hydration
        setTimeLeft(getRandomTime());

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime <= 1 ? getRandomTime() : prevTime - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        console.log("Email submitted:", email);
        setIsSubmitted(true);
    };

    if (!hasMounted) {
        return null; // Prevent rendering until client-side hydration is complete
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-2xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-20">
                <div className="text-center">
                    <FaPlaneDeparture className="mx-auto h-16 w-auto text-white" />
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Travhuio is Launching Soon!
                    </h2>
                    <p className="mt-2 text-sm text-white">
                        Get ready to discover the best flight and hotel deals. Compare prices and save big on your next trip!
                    </p>
                </div>
                <div className="mt-8">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>
                            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out backdrop-filter backdrop-blur-sm bg-opacity-80"
                                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaEnvelope className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" aria-hidden="true" />
                  </span>
                                    Get Notified When We Go Live!
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <FaEnvelope className="mx-auto h-16 w-16 text-white" />
                            <h3 className="mt-2 text-2xl font-medium text-white">You're on the List!</h3>
                            <p className="mt-1 text-sm text-white">
                                We'll let you know when you can start comparing deals on flights and hotels.
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm text-white font-bold">
                        We're Going Live In: {formatTime(timeLeft)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MaintenanceComponent;