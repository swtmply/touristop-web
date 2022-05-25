import Layout from "@/components/Layout";
import React from "react";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex min-h-screen gap-20 items-center ">
        <div className="flex flex-col max-w-lg gap-6">
          <div>
            <h1 className="font-bold text-7xl">This page is not available</h1>
          </div>
          <p className="font-serif">
            I&apos;m working on it. Please be patient. Thank you :)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
