import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase";
import { api } from "../utils/axios";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userrole, setUserrole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function logIn(email, password, role) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      setUserrole(role);
      const resemail = res.user.email;

      return resemail;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteUserAccount() {
    try {
      if (user && userrole !== "Admin") {
        await deleteUser(user); // Delete the user account
        logOut(); // Log out the user after successful deletion
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logOut() {
    await signOut(auth);
    setUser(null);
  }
  const getRole = async () => {
    if (user !== null) {
      const response = await api.post("/seller/signin", { email: user.email });
      const currentRole = response.data.role;
      setUserrole(currentRole);
    }
  };
  useEffect(() => {
    getRole();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);

      // Set loading state to false after user data is fetched
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // If loading, display a loading indicator
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return the user auth context provider with the user data
  return (
    <userAuthContext.Provider
      value={{ user, signUp, logIn, logOut, userrole, deleteUserAccount }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
