import { AuthorDoc } from '../model/Author';
import { EditionDoc } from '../model/Doc';
import { getDescriptionValue } from '../utils/getDescriptionValue';
import { getFetch } from './base';
import placeholder_book from '../assets/images/placeholder_book.png';

export const fetchBookDetails = async ({
  editionId,
  authorKey,
}: {
  editionId: string;
  authorKey: string | null;
}) => {
  try {
    const [editionData, authorData] = await Promise.all([
      getFetch<EditionDoc>(`https://openlibrary.org/books/${editionId}.json`),
      authorKey
        ? getFetch<AuthorDoc>(
            `https://openlibrary.org/authors/${authorKey}.json`,
          )
        : null,
    ]);

    const { title, description, covers, publish_date, number_of_pages } =
      editionData;
    const coverId = covers?.[0];

    return {
      id: editionId,
      title: title || 'Untitled',
      author: authorData?.name || 'Unknown Author',
      cover: coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : placeholder_book,
      description:
        getDescriptionValue(description) ?? 'No description available',
      year: publish_date || 'Unknown',
      pages: String(number_of_pages || 'N/A'),
      isCurrentlyReading: false,
    };
  } catch (error) {
    console.error('Error fetching book details:', error);

    return null;
  }
};
