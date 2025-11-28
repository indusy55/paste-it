import type { CreatePasteInput } from "@/types/models/pastes";
import { request } from "@/utils/fetcher";

export async function createPaste(input: CreatePasteInput) {
    return request.post('/pastes', input)
}