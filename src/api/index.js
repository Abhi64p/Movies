import Page1 from './CONTENTLISTINGPAGE-PAGE1.json';
import Page2 from './CONTENTLISTINGPAGE-PAGE2.json';
import Page3 from './CONTENTLISTINGPAGE-PAGE3.json';

export const getContent = page =>
  page === 1 ? Page1 : page === 2 ? Page2 : Page3;
