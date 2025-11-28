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
