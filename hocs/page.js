import { compose } from 'redux';

import withRedux from './withRedux';
import withLayout from './withLayout';

export default (params) => {
  const {
    title = 'Github Issue Lister 9000',
  } = params || {};

  return compose(
    withRedux,
    withLayout({
      title,
    }),
  );
};
