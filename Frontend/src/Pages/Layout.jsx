import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      <Sidebar />
      <main className="flex-1 bg-white rounded-3xl mx-4 my-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
