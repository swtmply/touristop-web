import Layout from "components/Layout";
import useFirebaseAuth from "hooks/useUser";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { RefreshIcon } from "@heroicons/react/outline";

const Home: NextPage = () => {
  const { authUser, loading, signInWithGoogle } = useFirebaseAuth();

  useEffect(() => {
    if (authUser) {
      Router.push("/dashboard");
    }
  }, [authUser]);

  return (
    <Layout>
      <button
        onClick={() => signInWithGoogle()}
        className="bg-green-300 hover:bg-green-400 text-white px-4 py-2 rounded"
      >
        {loading ? (
          <div className="animate-spin">
            <RefreshIcon className="w-6 h-6" />
          </div>
        ) : (
          "Login with Google"
        )}
      </button>
    </Layout>
  );
};

export default Home;
