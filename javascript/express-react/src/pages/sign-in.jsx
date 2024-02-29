import { LogInIcon, XIcon } from "lucide-react";
import { z } from "zod";

import { Button, Card, FormField, toast } from "@components/ui";
import { useNavigate } from "react-router-dom";
import { useAuthSlice } from "@store";
import { GuestOnly } from "@components/auth";

async function signIn(email, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return {
    data,
    status: res.status,
  };
}

const signInForm = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be less than 100 characters long" }),
});

export function SignIn() {
  const navigate = useNavigate();
  const authSlice = useAuthSlice();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const parsedData = signInForm.safeParse({ email, password });

    if (!parsedData.success) {
      toast.warning(parsedData?.error?.errors?.[0]?.message);
      return;
    }

    try {
      const { data, status } = await signIn(email, password);

      if (status === 200 && data?.account) {
        authSlice.dispatchAccount(data.account);
        toast.success(data?.message);
        navigate("/dashboard");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error signing in : ", error);
      toast.error(error?.message);
    }
  }

  return (
    <div className="flex flex-col w-full flex-1 items-center justify-center">
      <Card className="gap-8 py-10">
        <h1 className="text-3xl font-light text-zinc-50">Sign In</h1>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <FormField
            label="Email"
            inputProps={{
              type: "text",
              placeholder: "xyz@email.com",
              id: "email",
              name: "email",
              className: "w-full p-2 text-zinc-900 bg-zinc-100",
            }}
            errors={null}
          />

          <FormField
            label="Password"
            inputProps={{
              type: "password",
              placeholder: "***************",
              id: "password",
              name: "password",
              className: "w-full p-2 text-zinc-900 bg-zinc-100",
            }}
            errors={null}
          />

          <div className="grid grid-cols-2 gap-2 mt-6">
            <Button type="reset" startIcon={XIcon} fullWidth>
              Reset
            </Button>
            <Button
              type="submit"
              startIcon={LogInIcon}
              theme="primary"
              fullWidth
            >
              Sign In
            </Button>
          </div>
        </form>
      </Card>

      <div className="flex items-center justify-center gap-2 mt-5 text-sm">
        <span className="text-zinc-100">Don't have an account?</span>
        <a
          href="/register"
          className="text-sky-400 hover:text-sky-600 underline"
        >
          Register
        </a>
      </div>
    </div>
  );
}

export function SignInPage() {
  return (
    <GuestOnly>
      <SignIn />
    </GuestOnly>
  );
}
