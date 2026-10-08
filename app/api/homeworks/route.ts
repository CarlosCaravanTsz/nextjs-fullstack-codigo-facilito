import { getHomeworks, createHomework, getHomeworksByTitle } from "@/lib/homeworks";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

// Puedes usarla de manera global
async function requireUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error) {
        return null;
    }

    return data?.claims?.sub ?? null;
}

export async function GET(request: NextRequest) {
    try {
        if (!await requireUser()) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        // ?title=something
        const title = request.nextUrl.searchParams.get('title');
        const homeworks = title ? await getHomeworksByTitle(title) : await getHomeworks();

        return Response.json(homeworks);
    } catch (error) {
        console.error(error);
    }
}

export async function POST(request: NextRequest) {
    if (!await requireUser()) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const title = typeof body?.title === 'string' ? body.title.trim() : "";

    if (!title?.length || !title) {
        return Response.json({ error: "El titulo es requerido" }, { status: 400 });
    }

    const homework = await createHomework(title);

    if (homework) {
        revalidateTag("getHomeworks", { expire: 0 });
        revalidatePath("/");

        return Response.json(homework, { status: 201 });
    }

    return Response.json({ error: 'No se ha creado la tarea' }, { status: 400 });
}