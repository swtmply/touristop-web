import useFirebaseAuth from "hooks/useUser";
import { ReactFCWithChildren } from "lib/types";
import React from "react";

const DashboardLayout: ReactFCWithChildren = ({ children }) => {
  const { authUser, signOut } = useFirebaseAuth();

  return (
    <div className="flex min-h-screen relative">
      <header className="flex flex-col justify-between max-h-screen h-screen sticky top-0 bg-white p-4">
        <div>
          <h1>Touristop</h1>
          <p>Hello, {authUser?.displayName ?? "User"}</p>
        </div>
        <nav className="flex flex-col flex-1 justify-between gap-2">
          <ul>
            <li className="sr-only">Tourist Spots</li>
          </ul>
          <button
            onClick={() => signOut()}
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </header>
      <main className="bg-neutral-50 flex flex-1 justify-center">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
