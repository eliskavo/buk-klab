export type EditionDoc = {
  key: string;
  title: string;
  cover_i?: string;
  description?: string;
  authors?: {
    key: string;
    name: string;
  }[];
  publish_date?: string;
  number_of_pages?: number;
  covers?: number[];
};

export type DocType = {
  author_name?: string[];
  editions: {
    docs: EditionDoc[];
  };
};

export type SearchResponse = {
  docs: DocType[];
  offset: number;
};
