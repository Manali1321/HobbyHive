import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ allowedRoles, children }) {
  const [user, setUser] = useState("");
  async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  async function logIn(email, password, role) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser({ ...user, role: role });
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        return console.log("Not allow");
      }
      return children;
    } catch (error) {
      console.log(error);
    }
  }

  function logOut() {
    return signOut(auth);
  }
  // console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}
export function useUserAuth() {
  return useContext(userAuthContext);
}
