import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="ml-[230px] flex-1">
          <Header />
          <div>
            <main className="min-h-[calc(100dvh-128px)] p-5 relative">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
