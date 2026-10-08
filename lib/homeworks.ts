import { createClient } from "./supabase/server";
import { Homework } from "./data";

export async function getHomeworks(): Promise<Homework[] | null> {
    try {
        const supabase = await createClient();
        const { data, error } = await 
            supabase
                .from("homeworks")
                .select("*")
                .order("created_at", { ascending: true })

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export async function getHomework(id: string): Promise<Homework | undefined | string> {
    try {
        const supabase = await createClient();
        const { data, error, status, statusText } = await supabase
            .from("homeworks")
            .select("*")
            .eq('id', id)
            .maybeSingle();

        if (status !== 200 || error) {
            return statusText;
        }

        return data ?? undefined;
    } catch (error) {
        console.error(error);
        return "Ha ocurrido un error con tu query";
    }
}

export async function createHomework(title: string): Promise<Homework | undefined> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("homeworks")
            .insert({ title })
            .select()
            .single()

        if (error) {
            throw error;
        }

        return data ?? undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function deleteHomework(id: string): Promise<boolean> {
    try {
        const supabase = await createClient();
        const { error } = await supabase.from("homeworks").delete().eq("id", id);

        return !error;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function updateHomework(
    id: string,
    changes: Partial<Pick<Homework, "title" | "completed">>,
): Promise<Homework | undefined> {
    try {
        const supabase = await createClient();
        const { error, data } = await supabase
            .from("homeworks")
            .update(changes)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data ?? undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function getHomeworksByTitle(title: string): Promise<Homework[] | undefined> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("homeworks")
            .select("*")
            .ilike("title", `%${title}%`)
            .order("created_at", { ascending: true });

        if (error) {
            throw error;
        }

        return data ?? undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}