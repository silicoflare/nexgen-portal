import { useState, useEffect } from "react";

export default function useSession() {
  const [user, setUser] = useState<{
    id: string;
    role: "admin" | "vendor" | "participant";
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (res.ok) {
          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  return { user, loading };
}
