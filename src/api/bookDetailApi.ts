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

    const coverId = editionData.covers?.[0];

    return {
      id: editionId,
      title: editionData.title || 'Untitled',
      author: authorData.name || 'Unknown Author',
      cover: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : '',
      description:
        editionData.description?.value ||
        editionData.description ||
        'No description available',
      year: editionData.publish_date || 'Unknown',
      pages: editionData.number_of_pages?.toString() || 'N/A',
      isCurrentlyReading: false,
    };
  } catch (error) {
    console.error('Error fetching book details:', error);

    return null;
  }
};
