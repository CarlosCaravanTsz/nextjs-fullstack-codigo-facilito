"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    // TODO Mover este sign in directamente a un route handler o server action
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      return;
    }

    setLoading(false);

    router.replace("/");
    router.refresh();
  };

  const handleSignUp = async () => {
    setLoading(true);
    setMessage("");

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      return;
    }

    console.log(data, "data");
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form
        className="mx-auto w-full max-w-2xl px-4 py-8"
        onSubmit={handleLoginSubmit}
      >
        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">Mis tareas</h1>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-sky-900"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-sky-900"
              />
            </div>
            {message && <p className="text-sm text-red-600">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full cursor-pointer rounded-lg bg-sky-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
            >
              Iniciar sesión
            </button>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="mt-3 w-full cursor-pointer rounded-lg bg-sky-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
