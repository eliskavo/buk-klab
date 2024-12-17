export type DocType = {
  author_name?: string[];
  cover_i?: number;
  key: string;
  title: string;
};

export type SearchResponse = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: DocType[];
  num_found: number;
  q: string;
  offset: number;
};
