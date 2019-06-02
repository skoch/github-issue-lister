/* eslint-disable camelcase */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import styles from '../styles/index.scss';
import page from '../hocs/page';
import TextField from '../components/TextField';
import Repository from '../components/Repository';
import Issue from '../components/Issue';

import {
  getRepos,
  getIssues,
} from '../actions/github';

class IndexPage extends Component {
  static propTypes = {
    repos: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
    issues: PropTypes.arrayOf(
      PropTypes.shape({}),
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
    apiKey: PropTypes.string,
    // isFetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    apiKey: null,
  };

  static getInitialProps() {
    return {
      apiKey: process.env.GITHUB_API_KEY,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      apiKey: props.apiKey || null,
      idOrder: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { apiKey } = this.state;

    if (apiKey) {
      dispatch(getRepos({
        apiKey,
      }));
    }
  }

  handleTextChange = (event) => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      apiKey: value,
    });
  }

  handleSubmitApiKey = () => {
    const { dispatch } = this.props;
    const { apiKey } = this.state;

    if (apiKey) {
      dispatch(getRepos({
        apiKey,
      }));
    }
  }

  handleCollectIssues = ({ fullName }) => {
    const { dispatch } = this.props;
    const { apiKey } = this.state;

    dispatch(getIssues({
      apiKey,
      fullName,
    }));

    this.setState({
      ...this.state,
      currentRepository: fullName,
    });
  }

  handleClickUp = ({ from }) => {
    const { issues } = this.props;
    const { currentRepository } = this.state;
    const to = from - 1;

    issues.splice(to, 0, issues.splice(from, 1)[0]);

    const idOrder = issues.map(({ id }) => id);
    document.cookie = `${currentRepository}=${idOrder}`;

    this.setState({
      ...this.state,
      idOrder,
    });
  }

  handleClickDown = ({ from }) => {
    const { issues } = this.props;
    const { currentRepository } = this.state;
    const to = from + 1;

    issues.splice(to, 0, issues.splice(from, 1)[0]);

    const idOrder = issues.map(({ id }) => id);
    document.cookie = `${currentRepository}=${idOrder}`;

    this.setState({
      ...this.state,
      idOrder,
    });
  }

  render() {
    const { repos, issues } = this.props;
    const { currentRepository, apiKey } = this.state;
    const label = apiKey
      ? 'Github API Key from ./config/.env'
      : 'Github API Key';
    return (
      <div className={styles.root}>
        <h1>
          Github Issue Lister 9000
          <span role="img" aria-label="Rainbow">🌈</span>
        </h1>
        <section>
          <TextField
            floatingLabelText={label}
            onChange={apiKey ? null : this.handleTextChange}
            value={apiKey}
          />
          {!apiKey && (
            <button
              onClick={this.handleSubmitApiKey}
              type="submit"
            >
              List Repositories
            </button>
          )}
        </section>
        <h2>Repositories</h2>
        {repos.length > 0 ? (
          <section className={styles.repos}>
            <div className={styles.list}>
              {repos.map(({
                id,
                name,
                full_name,
                open_issues,
              }) => (
                <Repository
                  key={id}
                  name={name}
                  fullName={full_name}
                  issueCount={open_issues}
                  onClick={this.handleCollectIssues}
                  isActive={currentRepository === full_name}
                />
              ))}
            </div>
            {issues.length > 0 && (
              <div className={styles.issues}>
                {issues.map(({
                  id,
                  user,
                  title,
                  number,
                  html_url,
                  created_at,
                  updated_at,
                }, index) => (
                  <Issue
                    id={id}
                    key={id}
                    user={user}
                    title={title}
                    order={index}
                    url={html_url}
                    number={number}
                    created={created_at}
                    updated={updated_at}
                    totalIssues={issues.length}
                    onClickUp={this.handleClickUp}
                    onClickDown={this.handleClickDown}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          <section>
            <h3>
              <span role="img" aria-label="Point Up">☝️</span>
              {' '}
              Please enter a valid Github API Key
              {' '}
              <span role="img" aria-label="Point Up">☝️</span>
            </h3>
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ github }) => ({
  ...github,
});

export default compose(
  page(),
  connect(mapStateToProps),
)(IndexPage);
