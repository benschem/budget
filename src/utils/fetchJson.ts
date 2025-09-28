export default async function fetchJson<GivenType>(url: string): Promise<GivenType> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return (await response.json()) as GivenType;
}
