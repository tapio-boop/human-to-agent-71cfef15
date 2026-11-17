export const ORDER_URL =
  "https://propublishing.fi/products/ihmisten-ja-agenttien-organisaatio-miten-muotoilet-toimintamallin?utm_source=h2a.fi&utm_medium=referral&utm_campaign=julkistus";

const MAX_UTM_CONTENT_LENGTH = 100;

/**
 * Kustantajan tilauslinkki. Jos sivun osoitteessa on utm_content, sama arvo lisätään
 * tilauslinkkiin, jotta näkyy, mistä sähköpostiryhmästä ostaja tuli. Tyhjä tai liian
 * pitkä arvo jätetään pois.
 */
export function orderUrl(search: string): string {
  const value = (new URLSearchParams(search).get("utm_content") ?? "").trim();
  if (value.length === 0 || value.length > MAX_UTM_CONTENT_LENGTH) return ORDER_URL;
  return `${ORDER_URL}&utm_content=${encodeURIComponent(value)}`;
}
