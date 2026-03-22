import React from "react";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-gray-500">Select a user to start chat</h1>
      </div>
    </div>
  );
}

export default Home;