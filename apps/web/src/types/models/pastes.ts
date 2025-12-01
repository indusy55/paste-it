export interface CreatePasteInput {
  title?: string;
  content: string;
  lang?: string;
  attachments?: string[];
  secret_hash?: string;
  expired_at: string;
}

export interface UpdatePasteInput {
  title?: string;
  content?: string;
  lang?: string;
  attachments?: string[];
  secret_hash?: string;
  expired_at?: string;
}

export interface Paste {
  content: string;
  created_at: string;
  expired_at: string;
  id: string;
  lang: string | null;
  secret_hash: string | null;
  slug: string;
  title: string;
  updated_at: string;
}

export type PasteList = Paste[]