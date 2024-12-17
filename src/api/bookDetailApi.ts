import { DetailedAuthorType } from '../model/Author';
import { BookType } from '../model/Book';
import { SearchResponse } from '../model/Doc';
import { DetailWorkType } from '../model/Work';
import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';
import { getFetch } from './base';

type RatingsResponse = {
  summary: {
    average: number;
    count: number;
  };
};

const fetchBookRating = async (workId: string) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/works/${workId}/ratings.json`,
    );
    const ratingsData: RatingsResponse =
      (await response.json()) as RatingsResponse;

    if (ratingsData.summary.average) {
      return ratingsData.summary.average;
    }

    return 0;
  } catch (error) {
    console.error('Error fetching book rating:', error);

    return 0;
  }
};

const getAuthorData = async (bookData: DetailWorkType) => {
  const authorKey =
    bookData.authors[0].author.key || bookData.authors?.[0]?.key;

  if (!authorKey) {
    return {
      name: 'Unknown Author',
      birth_date: '',
      bio: '',
      key: '',
    };
  }

  return getFetch<DetailedAuthorType>(
    `https://openlibrary.org/authors/${parseItemIdFromUri(authorKey)}.json`,
  );
};

const fetchDetail = async (endpoint: string, authorKey: string) => {
  try {
    let authorPromise: Promise<DetailedAuthorType> = Promise.resolve() as any;
    if (authorKey) {
      authorPromise = getFetch<DetailedAuthorType>(
        `https://openlibrary.org/authors/${authorKey}.json`,
      );
    }

    const [bookData, authorResult] = await Promise.all([
      getFetch<DetailWorkType>(endpoint),
      authorPromise,
    ]);

    let authorData = authorResult;

    if (!authorData) {
      authorData = await getAuthorData(bookData);
    }

    const coverId = bookData.covers[0];
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : '';

    const rating = await fetchBookRating(parseItemIdFromUri(bookData.key));

    const bookDetails: BookType = {
      id: parseItemIdFromUri(bookData.key),
      title: bookData.title || 'Untitled',
      author: authorResult.name || 'Unknown Author',
      cover: coverUrl,
      description:
        bookData.description?.value ??
        bookData.description ??
        'No description available',
      year:
        bookData.first_publish_date ||
        new Date(bookData.first_publish_date).getFullYear() ||
        'Unknown',
      pages: bookData.number_of_pages || 'N/A',
      rating,
      isCurrentlyReading: false,
      editionKey: bookData.key,
    };

    return bookDetails;
  } catch (error) {
    console.error('Error fetching book details:', error);

    return null;
  }
};

export const fetchBookDetails = async (queryId: string, authorKey: string) => {
  const isWorkKey = queryId.startsWith('OL') && queryId.endsWith('W');
  const endpoint = isWorkKey
    ? `https://openlibrary.org/works/${queryId}.json`
    : `https://openlibrary.org/books/${queryId}.json`;

  return fetchDetail(endpoint, authorKey);
};

export const fetchRecommendedBooks = async ({
  queryId,
  authorName,
}: {
  queryId: string;
  authorName: string;
}) => {
  try {
    const recommendedData = await getFetch<SearchResponse>(
      `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}&limit=5`,
    );

    const recommendedBooksData: BookType[] = recommendedData.docs
      .filter((book) => book.key !== queryId)
      .map((recommendedBook) => ({
        id: parseItemIdFromUri(recommendedBook.key),
        title: recommendedBook.title,
        author: recommendedBook.author_name?.[0] || 'Unknown',
        cover: recommendedBook.cover_i
          ? `https://covers.openlibrary.org/b/id/${recommendedBook.cover_i}-M.jpg`
          : '',
        description: '',
        year: recommendedBook.first_publish_year || 'Unknown',
        pages: recommendedBook.number_of_pages_median || 'N/A',
        isCurrentlyReading: false,
      }));

    return recommendedBooksData;
  } catch (error) {
    console.error('Error fetching recommended books:', error);

    return [];
  }
};
