import { useAuthSlice } from "@store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthOnly({ children }) {
  const navigate = useNavigate();
  const { account } = useAuthSlice();

  useEffect(() => {
    if (!account) {
      navigate("/sign-in");
    }
  }, [account, navigate]);

  if (!account) {
    return null;
  }
  return children;
}
