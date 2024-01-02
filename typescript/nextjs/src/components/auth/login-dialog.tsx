import { useLogin } from '@/lib/hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogInIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import { FormField } from '../ui/form-field';

const loginForm = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be less than 100 characters long' }),
});

export type LoginForm = z.infer<typeof loginForm>;

export const LoginDialog = ({
  open,
  onClose,
  handleDialogPrimaryAction = () => {},
}: {
  open: boolean;
  onClose: (value: boolean) => void;
  handleDialogPrimaryAction?: (data: LoginForm) => void;
}) => {
  const { control, onSubmit, errors, handleSubmit } = useLogin<LoginForm>({
    onSubmit: handleDialogPrimaryAction,
    resolver: zodResolver(loginForm),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      mainIcon="LogIn"
      title="Login"
      description="Login your existing account"
      primaryCta="Register">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-3 py-8 px-12">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormField
                label="Email"
                size="md"
                errors={errors.email && errors.email?.message}
                inputProps={{
                  type: 'text',
                  placeholder: 'Email address',
                  ...field,
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormField
                label="Password"
                size="md"
                errors={errors.password && errors.password?.message}
                inputProps={{
                  type: 'password',
                  placeholder: '************',
                  ...field,
                }}
              />
            )}
          />
        </div>

        <div className="w-full flex items-center justify-end py-4 px-6 gap-x-2 border-t border-zinc-700">
          <Button
            type="button"
            onClick={() => onClose(false)}>
            Cancel
          </Button>

          <Button
            color="primary"
            type="submit">
            Login
            <LogInIcon size={18} />
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
