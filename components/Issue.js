import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';

import styles from '../styles/components/issue.scss';

const Issue = ({
  id,
  url,
  user,
  title,
  order,
  number,
  updated,
  created,
  onClickUp,
  onClickDown,
  totalIssues,
}) => (
  <div
    id={id}
    className={styles.root}
  >
    <div className={styles.sorting}>
      <button
        className={styles.small}
        type="button"
        onClick={() => onClickUp({ from: order })}
        disabled={order === 0}
      >
        move up
      </button>
      <button
        className={styles.small}
        type="button"
        onClick={() => onClickDown({ from: order })}
        disabled={order === totalIssues - 1}
      >
        move down
      </button>
    </div>
    <div className={styles.data}>
      <div className={styles.title}>
        <h4>
          {title}
          <span>{`#${number}`}</span>
        </h4>
      </div>
      <div className={styles.user}>
        <img src={user.avatar_url} alt={user.login} />
        <h5>{user.login}</h5>
      </div>
      <div className={styles.dates}>
        <h6>
          <span>Created: </span>
          {`${moment(created).format('DD/MM/YYYY')}`}
        </h6>
        <h6>
          <span>Updated: </span>
          {`${moment(updated).fromNow()}`}
        </h6>
      </div>
      <Link href={url}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Github &raquo;
        </a>
      </Link>
    </div>
  </div>
);

Issue.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  updated: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  onClickUp: PropTypes.func.isRequired,
  onClickDown: PropTypes.func.isRequired,
  totalIssues: PropTypes.number.isRequired,
};

export default Issue;
