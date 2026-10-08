"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = await createClient();

    supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="cursor-pointer ml-4">
      Cerrar sesion
    </button>
  );
}
