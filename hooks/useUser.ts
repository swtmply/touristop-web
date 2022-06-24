import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "lib/firebase";
import Router from "next/router";
import { useState, useEffect, SetStateAction } from "react";

const provider = new GoogleAuthProvider();

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: SetStateAction<User | null>) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setAuthUser(authState);
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    setAuthUser(result.user);
  };

  const signOut = async () => {
    await auth.signOut();
    setAuthUser(null);
    Router.push("/");
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
}
