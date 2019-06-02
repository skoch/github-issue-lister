import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const CheggHead = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

CheggHead.propTypes = {
  title: PropTypes.string,
};

CheggHead.defaultProps = {
  title: 'Chegg Code Challenge',
};

export default CheggHead;
