"use server";

import { updateTag } from "next/cache";
import { deleteHomework as deleteHomeworkFromDB, getHomework, updateHomework } from "./homeworks";

export async function toggleHomework(id: string, completed: boolean) {
    const homework = getHomework(id);

    if (!homework) {
        throw new Error("Homework not found");
    }

    // TODO tarea, actualizar el title
    const updated = updateHomework(id, { ...homework, completed });
   
    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return updated;
};

export async function deleteHomework(id: string) {
    const homework = getHomework(id);

    if (!homework) {
        throw new Error("Homework not found");
    }

    const deleted = deleteHomeworkFromDB(id);

    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return deleted;
}