'use client';

import { useStore } from '@/lib/hooks/useStore';
import { LogInIcon, LogOutIcon, UserPlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SafeAuth, loginServerSubmit } from '../auth/login-action';
import { LoginDialog, LoginForm } from '../auth/login-dialog';
import { registerServerSubmit } from '../auth/register-action';
import { RegisterDialog, RegistrationForm } from '../auth/register-dialog';
import { Button } from '../ui/button';
import { NoSsr } from '../ui/no-ssr';

const CsrComponent = () => {
  const store = useStore<SafeAuth>({ key: 'auth', storeType: 'local' });

  const isGuest = !store.value;

  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState<boolean>(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  const refresh = () => {
    window.location.reload();
  };

  const handleRegistration = async (data: RegistrationForm) => {
    const [res, error] = await registerServerSubmit(data);
    if (!error && res) {
      toast.success('Registration successful');
      setIsRegisterDialogOpen(true);
      refresh();
    }

    if (error && error?.message) {
      toast.error(error?.message);
    }
  };

  const handleLogin = async (data: LoginForm) => {
    setIsRegisterDialogOpen(false);
    const [res, error] = await loginServerSubmit(data);

    if (!error && res) {
      toast.success('Login successful');
      store.set(res);
      setIsLoginDialogOpen(false);
      refresh();
    }

    if (error && error?.message) {
      toast.error(error?.message);
    }
  };

  const handleLogout = () => {
    toast.success('Logout successful');
    store.remove();
    refresh();
  };

  if (!isGuest) {
    return (
      <Button
        size="sm"
        className="py-1.5 ml-4"
        color="danger"
        onClick={handleLogout}>
        Logout
        <LogOutIcon className="w-5 h-5 inline-block" />
      </Button>
    );
  }

  return (
    <div className="flex gap-2 ml-4">
      <Button
        color="primary"
        size="sm"
        className="py-1.5"
        onClick={() => setIsLoginDialogOpen(true)}>
        Login
        <LogInIcon className="w-5 h-5 inline-block" />
      </Button>
      <Button
        size="sm"
        className="py-1.5"
        onClick={() => setIsRegisterDialogOpen(true)}>
        Register
        <UserPlusIcon className="w-5 h-5 inline-block" />
      </Button>

      {/* Register Dialog */}
      {isRegisterDialogOpen ? (
        <RegisterDialog
          open={isRegisterDialogOpen}
          onClose={setIsRegisterDialogOpen}
          handleDialogPrimaryAction={handleRegistration}
        />
      ) : null}

      {/* Login Dialog */}
      {isLoginDialogOpen ? (
        <LoginDialog
          open={isLoginDialogOpen}
          onClose={setIsLoginDialogOpen}
          handleDialogPrimaryAction={handleLogin}
        />
      ) : null}
    </div>
  );
};

export const LoginAndRegister = () => (
  <NoSsr>
    <CsrComponent />
  </NoSsr>
);
