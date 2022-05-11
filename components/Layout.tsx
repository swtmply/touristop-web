import { ReactFCWithChildren } from "lib/types";
import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";

const Layout: ReactFCWithChildren = ({ children }) => {
  return (
    <div className="min-h-screen grid justify-center auto-rows-max">
      <Header />
      <main className="w-[80rem] max-w-[1440px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
