"use client";
import { ButtonHTMLAttributes, FC, useState } from 'react';
import Button from './ui/button'; // Assuming Button is a styled component
import { toast } from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Loader2, LogOut } from 'lucide-react';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  return (
    <Button
      {...props}
      variant="ghost"
      onClick={async () => {
        setIsSigningOut(true);
        try {
          // Call signOut and specify the callback URL to redirect to /login
          await signOut({ callbackUrl: '/login' });
        } catch (error) {
          toast.error('There was a problem signing out');
        } finally {
          setIsSigningOut(false);
        }
      }}
    >
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4 w-4" /> // Spinner shown during sign out
      ) : (
        <LogOut className="w-4 h-4 text-white" /> // Log out icon
      )}
    </Button>
  );
};

export default SignOutButton;
