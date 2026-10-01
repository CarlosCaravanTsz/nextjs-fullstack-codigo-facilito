"use server";

import { updateTag } from "next/cache";
import { deleteHomeWork as deleteHomeworkFromDB, getHomeworkByIdLive, updateHomework } from "./data";

export async function toggleHomework(id: string, completed: boolean) {
    const homework = getHomeworkByIdLive(id);

    if (!homework) {
        throw new Error("Homework not found");
    }

    const updated = updateHomework({ ...homework, completed });
   
    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return updated;
};

export async function deleteHomework(id: string) {
    const homework = getHomeworkByIdLive(id);

    if (!homework) {
        throw new Error("Homework not found");
    }

    const deleted = deleteHomeworkFromDB(id);

    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return deleted;
}