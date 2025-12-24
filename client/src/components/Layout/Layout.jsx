import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { createUser } from "../../utils/api";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import useFavourites from "../../hooks/useFavourites";
import UserDetailContext from "../../context/UserDetailContext";
import useBookings from "../../hooks/useBookings";

const Layout = () => {

  useFavourites()
  useBookings()
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
 
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        // 1. Get the token silently
        const res = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });

        // 2. Update Local State
        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));

        // 3. Trigger the mutation (Backend Call)
        console.log("Triggering mutation for:", user?.email); // DEBUG LOG
        mutate(res);
        
      } catch (error) {
        console.error("Error in token/registration flow:", error);
      }
    };

    // GUARDIAN CLAUSE: Only run if authenticated AND user data exists
    if (isAuthenticated && user) {
      getTokenAndRegister();
    }
    
  }, [isAuthenticated, user, getAccessTokenSilently]); // <--- CRITICAL: Added 'user' to dependencies

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;