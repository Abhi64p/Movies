import Page1 from './CONTENTLISTINGPAGE-PAGE1.json';
import Page2 from './CONTENTLISTINGPAGE-PAGE2.json';
import Page3 from './CONTENTLISTINGPAGE-PAGE3.json';

/**
 * Function to get contents of a page.
 * @param {Number} page page number to fetch data from
 * @returns {}
 */
export const getContent = page => {
  const json = page === 1 ? Page1 : page === 2 ? Page2 : Page3;
  return {
    ...json,
    page: {
      ...json.page,
      'content-items': {
        ...json.page['content-items'],
        content: json.page['content-items'].content?.map((item, index) => ({
          ...item,
          id: `${page}${index}`, //For appending unique ids
        })),
      },
    },
  };
};
