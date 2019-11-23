/**
 * Fetches JSON exercise and routine data for initial data seeding
 * @param url
 * @todo convert this to an async function
 */
export function getSeedData(url: string): Promise<any> {
  return fetch(url, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.error(`Problem fetching JSON data: ${err}`);
    });
}

/**
 * Returns date string formatted like MM/DD/YYYY
 */
export function getDateString(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + "/" + day + "/" + year;
}
