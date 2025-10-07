"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onAuthChange?: () => void;
}

const Navbar = ({ onAuthChange }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/session");
      setIsAuthenticated(response.ok);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      sessionStorage.clear();
      setIsAuthenticated(false);
      if (onAuthChange) {
        onAuthChange();
      }
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="flex justify-between items-center py-5 px-4 md:px-10">
        <div>
          <Link href="/">
            <h1 className="font-bold text-xl cursor-pointer">Locksy</h1>
          </Link>
        </div>

        <div className="hidden md:flex space-x-5 items-center">
          <Link href="/" className="hover:text-gray-600">Vault</Link>
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/signup" className="hover:text-gray-600">SignUp</Link>
                  <Link href="/login" className="hover:text-gray-600">Login</Link>
                </>
              )}
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="flex flex-col space-y-1 px-4 py-3">
            <Link 
              href="/" 
              className="px-3 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vault
            </Link>
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 text-left rounded-lg hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link 
                      href="/signup" 
                      className="px-3 py-2 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      SignUp
                    </Link>
                    <Link 
                      href="/login" 
                      className="px-3 py-2 rounded-lg hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
