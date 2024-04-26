import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom';
import { Appbar } from "../components/Appbar";

function Home() {
  return (
      <>
          <Appbar />
          <div className="flex">
            {/* Side Navigation Bar */}
            <Navbar />
            {/* Main component on basis of selected navigation from nav bar */}
            <main className="grow">
              <Outlet />
            </main>
          </div>
      </>
  );
}

export default Home