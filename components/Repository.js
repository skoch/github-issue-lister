import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '../styles/components/repository.scss';

const Repository = ({
  name, onClick, isActive, fullName, issueCount,
}) => (
  <div className={classnames(
    styles.root,
    { [styles.active]: isActive },
  )}
  >
    <button
      onClick={() => onClick({ fullName })}
      type="button"
    >
      <h3>
        {`${name.replace(/-/gi, ' ')}`}
      </h3>
      <div className={styles.issueCount}>
        {`${issueCount} ${issueCount === 1 ? 'issue' : 'issues'}`}
      </div>
    </button>
  </div>
);

Repository.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  fullName: PropTypes.string.isRequired,
  issueCount: PropTypes.number.isRequired,
};

export default Repository;
