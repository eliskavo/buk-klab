import { AuthorType } from './OpenLibrary';

export type WorkType = {
  author_key?: string[];
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  key: string;
  language?: string[];
  title: string;
};

export type DetailWorkType = {
  key: string;
  title: string;
  first_publish_date: string;
  authors: AuthorType[];
  description: string;
  covers: number[];
};
