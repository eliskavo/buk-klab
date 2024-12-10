import { Book } from '../../types/types';
import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';

const fetchDetail = async (
  endpoint: string,
  isWorkKey: boolean,
): Promise<Book | null> => {
  try {
    const bookResponse = await fetch(endpoint);

    if (!bookResponse.ok) {
      throw new Error('Book not found');
    }

    const bookData = await bookResponse.json();

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

    const bookDetails: Book = {
      id: parseItemIdFromUri(bookData.key),
      title: bookData.title || 'Untitled',
      author: authorName,
      cover: coverUrl,
      description:
        typeof bookData.description === 'string'
          ? bookData.description
          : bookData.description?.value || 'No description available',
      year: bookData.first_publish_date
        ? new Date(bookData.first_publish_date).getFullYear()
        : 'Unknown',
      pages: bookData.number_of_pages || 'N/A',
      rating: Math.random() * 5,
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
        rating: Math.random() * 5,
      }));

    return recommendedBooksData;
  } catch (error) {
    console.error('Error fetching recommended books:', error);

    return [];
  }
};
