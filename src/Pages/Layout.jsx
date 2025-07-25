import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      {/* Main content area */}
      <main className="flex-1 bg-white rounded-3xl mx-4 my-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
