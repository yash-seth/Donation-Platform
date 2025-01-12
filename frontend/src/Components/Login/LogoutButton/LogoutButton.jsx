import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => {alert("You have successfully logged out!");logout({ logoutParams: { returnTo: window.location.origin } })}} className='nav-controls-btns'>
      Log Out
    </button>
  );
};

export default LogoutButton;