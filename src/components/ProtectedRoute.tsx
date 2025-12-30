import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // 1️⃣ Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // 2️⃣ Listen to auth changes (VERY IMPORTANT)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 3️⃣ Block render until auth checked
  if (loading) {
    return <div className="text-center">Checking authentication...</div>;
  }

  // 4️⃣ No session = HARD REDIRECT
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  // 5️⃣ Authenticated → allow
  return children;
}
