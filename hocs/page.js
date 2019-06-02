import { compose } from 'redux';

import withRedux from './withRedux';
import withLayout from './withLayout';

export default (params) => {
  const {
    title = 'Chegg Code Challenge',
  } = params || {};

  return compose(
    withRedux,
    withLayout({
      title,
    }),
  );
};
