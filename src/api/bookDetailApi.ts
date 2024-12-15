import { Book } from '../model/Book';
import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';

type RatingsResponse = {
  summary: {
    average: number;
    count: number;
  };
};

const fetchBookRating = async (workId: string): Promise<number> => {
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

const fetchDetail = async (
  endpoint: string,
  isWorkKey: boolean,
): Promise<Book | null> => {
  try {
    const bookResponse = await fetch(endpoint);
    if (!bookResponse.ok) {
      throw new Error('Book not found');
    }
    const bookData: any = (await bookResponse.json()) as Book;

    const authorKey = isWorkKey
      ? bookData.authors?.[0]?.author?.key
      : bookData.authors?.[0]?.key;

    let authorResult = { name: 'Unknown Author' };
    if (authorKey) {
      const authorResponse = await fetch(
        `https://openlibrary.org/authors/${parseItemIdFromUri(authorKey)}.json`,
      );
      authorResult = await authorResponse.json();
    }
    const authorName = authorResult.name || 'Unknown Author';

    const coverId = bookData.covers?.[0];
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : '';

    const rating = await fetchBookRating(parseItemIdFromUri(bookData.key));

    const bookDetails: Book = {
      id: parseItemIdFromUri(bookData.key),
      title: bookData.title || 'Untitled',
      author: authorName,
      cover: coverUrl,
      description:
        bookData.description?.value ??
        bookData.description ??
        'No description available',
      year:
        bookData.first_publish_date ??
        new Date(bookData.first_publish_date).getFullYear() ??
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

export const fetchBookDetails = async (
  queryId: string,
): Promise<Book | null> => {
  const isWorkKey = queryId.startsWith('OL') && queryId.endsWith('W');
  const endpoint = isWorkKey
    ? `https://openlibrary.org/works/${queryId}.json`
    : `https://openlibrary.org/books/${queryId}.json`;

  return fetchDetail(endpoint, isWorkKey);
};

export const fetchRecommendedBooks = async (
  authorName: string,
  queryId: string,
): Promise<Book[]> => {
  try {
    const recommendedResponse = await fetch(
      `https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}&limit=5`,
    );
    const recommendedData = await recommendedResponse.json();
    const recommendedBooksData: Book[] = recommendedData.docs
      .filter((b: any) => b.key !== queryId)
      .slice(0, 5)
      .map((recommendedBook: any) => ({
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
