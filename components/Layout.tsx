import { ReactFCWithChildren } from "lib/types";
import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";

const Layout: ReactFCWithChildren = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="min-h-screen grid justify-center auto-rows-max">
        <main className="w-[80rem] max-w-[1440px]">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
