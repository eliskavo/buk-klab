import { AuthorDoc } from '../model/Author';
import { EditionDoc } from '../model/Doc';
import { parseItemIdFromUri } from '../utils/parseItemIdFromUri';
import { getFetch } from './base';

export const fetchBookDetails = async (editionId: string) => {
  try {
    const editionData = await getFetch<EditionDoc>(
      `https://openlibrary.org/books/${editionId}.json`,
    );

    const authorId = parseItemIdFromUri(editionData.authors?.[0]?.key || '');

    const authorData = await getFetch<AuthorDoc>(
      `https://openlibrary.org/authors/${authorId}.json`,
    );

    const coverId = editionData.covers?.find((id) => id > 0);
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : '';

    return {
      id: editionId,
      title: editionData.title || 'Untitled',
      author: authorData.name || 'Unknown Author',
      authorId,
      cover: coverUrl,
      description: editionData.description || 'No description available',
      year: editionData.publish_date || 'Unknown',
      pages: editionData.number_of_pages?.toString() || 'N/A',
      isCurrentlyReading: false,
    };
  } catch (error) {
    console.error('Error fetching book details:', error);

    return null;
  }
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
