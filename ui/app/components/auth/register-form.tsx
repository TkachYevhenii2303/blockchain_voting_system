"use client";

import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/ui/button';
import { Card, CardContent } from '@/components/shadcn/ui/card';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@/components/shadcn/ui/label';
import rhamster_logo from '../../../public/characters/rhamster_back.jpg';
import { toast } from 'sonner';


export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    location.href = '/wallets';
    toast.success('Registration successful');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 rounded-lg border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={rhamster_logo.src}
              alt="Image"
              className="absolute h-full w-full object-cover"
            />
          </div>
          <form className="p-8 bg-[#22223b]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold font-mulish">
                  Welcome to Rhamster
                </h1>
                <p className="text-muted-foreground text-balance">
                  Create an account to get started
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-white font-inter">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="adolf@rhamster.com"
                  required
                  className="rounded-xs font-inter"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white font-inter">
                    Create a password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline font-inter">
                    Already have an account?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="rounded-xs font-inter"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white font-inter">
                    Confirm password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="rounded-xs font-inter"
                />
              </div>
              <Button
                type="submit"
                className="group relative w-full font-mulish uppercase tracking-[0.15em] rounded-xs cursor-pointer
                          bg-gradient-to-r from-[#ffb700] via-[#ffaa00] to-[#ffa200] 
                          hover:from-[#e6a500] hover:via-[#e69900] hover:to-[#e69200]
                          text-white font-bold py-5
                          shadow-[0_0_20px_rgba(255,183,0,0.3)] 
                          hover:shadow-[0_0_30px_rgba(255,183,0,0.5)]
                          border border-[#ffb700]/30 hover:border-[#ffb700]/50
                          transform hover:scale-[1.02] active:scale-[0.98]
                          transition-all duration-300 ease-out
                          before:absolute before:inset-0 before:rounded-xs 
                          before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0
                          before:translate-x-[-100%] hover:before:translate-x-[100%]
                          before:transition-transform before:duration-1000 before:ease-out
                          overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create account
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"
                  />
                </span>
              </Button>
              <div className="text-center text-sm font-mulish">
                Already have an account?{' '}
                <a href="/auth/sign-in" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
