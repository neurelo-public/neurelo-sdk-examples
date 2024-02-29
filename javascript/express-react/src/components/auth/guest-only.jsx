import { useAuthSlice } from "@store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function GuestOnly({ children }) {
  const navigate = useNavigate();
  const { account } = useAuthSlice();

  useEffect(() => {
    if (account) {
      navigate("/dashboard");
    }
  }, [account, navigate]);

  if (account) {
    return null;
  }
  return children;
}
