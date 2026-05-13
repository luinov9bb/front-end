import type { Book } from "../../types/catalog";

export type ApiBookDto = Partial<Book> & Pick<Book, "id">;
