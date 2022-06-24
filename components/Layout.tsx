import { ReactFCWithChildren } from "lib/types";
import React from "react";

const Layout: ReactFCWithChildren = ({ children }) => {
  return (
    <div className="flex flex-col items-center overflow-x-hidden font-inter">
      <div className="min-h-screen w-full">
        <main className="w-10/12 max-w-[1440px] m-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
