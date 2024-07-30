"use client";

import React from 'react';
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const LandingPage = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter(); // Initialize router for redirection

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push('/'); // Redirect to the landing page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  React.useEffect(() => {
    if (user) {
      router.push('/week-8/shopping-list'); // Redirect to the shopping list page if user is logged in
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col items-center justify-center">
      {!user ? (
        <>
          <h1 className="text-4xl font-bold mb-6 text-center text-pink-800">Welcome to the Shopping List App</h1>
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign In with GitHub
          </button>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6 text-center text-pink-800">
            Welcome, {user.displayName} ({user.email})
          </h1>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default LandingPage;
