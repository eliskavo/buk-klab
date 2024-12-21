export type EditionDoc = {
  key: string;
  author_key?: string[];
  title: string;
  cover_i?: string;
  description?: string | { value: string };
  authors?: {
    key: string;
    name: string;
  }[];
  publish_date?: string;
  number_of_pages?: number;
  covers?: string[];
};

export type DocType = {
  author_name?: string[];
  author_key?: string[];
  editions: {
    docs: EditionDoc[];
  };
};

export type SearchResponse = {
  docs: DocType[];
  offset: number;
};
