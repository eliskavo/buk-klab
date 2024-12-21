export const getDescriptionValue = (
  description: string | { value: string } | undefined,
) => (typeof description === 'string' ? description : description?.value);
