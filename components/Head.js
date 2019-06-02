import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const GithubIssueListerHead = ({ title }) => (
  <Head>
    <title>{title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);

GithubIssueListerHead.propTypes = {
  title: PropTypes.string,
};

GithubIssueListerHead.defaultProps = {
  title: 'Github Issue Lister 9000',
};

export default GithubIssueListerHead;
