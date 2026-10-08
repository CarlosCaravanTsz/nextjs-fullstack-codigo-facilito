// Server component
import HomeworkList from "@/components/List";
import LogoutButton from "@/components/LogoutButton";
import MyHomeworks from "@/components/MyHomeworks";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  // TODO
  if (error || !data?.claims?.sub) {
    console.log("redirect to login");
    redirect("/login");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-center bg-white dark:bg-black">
        <LogoutButton />
        <MyHomeworks>
          <HomeworkList />
        </MyHomeworks>
      </main>
    </div>
  );
}
