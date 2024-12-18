export const getFetch = async <T>(url: string) => {
  const response = await fetch(url);

  return response.json() as Promise<T>;
};
