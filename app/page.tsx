"use client";

import { useEffect, useState } from "react";
// import Navbar from "@/section/navbar";
import VaultDashboard from "@/components/vault-dashboard";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar onAuthChange={checkAuth} /> */}
      <VaultDashboard user={user} isAuthenticated={!!user} loading={loading} onAuthChange={checkAuth} />
    </>
  );
}
