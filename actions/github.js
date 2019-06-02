import axios from 'axios';
import { getCookie } from '../utils/misc';

import {
  ADD_GITHUB_REPOS,
  ADD_GITHUB_ISSUES,
  API_GITHUB_REQUEST,
  API_GITHUB_SUCCESS,
  API_GITHUB_FAILURE,
} from './actionTypes';

const apiGithubRequest = () => ({
  type: API_GITHUB_REQUEST,
});

const apiGithubSuccess = () => ({
  type: API_GITHUB_SUCCESS,
});

const apiGithubFailure = ({ error }) => ({
  type: API_GITHUB_FAILURE,
  error,
});

const addRepos = ({ data }) => ({
  type: ADD_GITHUB_REPOS,
  payload: {
    data,
  },
});

const addIssues = ({ data }) => ({
  type: ADD_GITHUB_ISSUES,
  payload: {
    data,
  },
});

export function getRepos({ apiKey }) {
  return async (dispatch) => {
    dispatch(apiGithubRequest());

    return axios({
      method: 'GET',
      url: 'https://api.github.com/user/repos?page=2',
      headers: {
        Authorization: `token ${apiKey}`,
      },
    }).then(({ data }) => {
      dispatch(addRepos({
        data,
      }));
      dispatch(apiGithubSuccess());
    }).catch((err) => {
      dispatch(apiGithubFailure({
        error: err,
      }));
    });
  };
}

const sortByKey = ({ array, order, key }) => {
  array.sort((a, b) => {
    const aa = a[key];
    const bb = b[key];

    if (order.indexOf(aa) > order.indexOf(bb)) {
      return 1;
    }
    return -1;
  });

  return array;
};

export function getIssues({ fullName, apiKey }) {
  return async (dispatch) => {
    dispatch(apiGithubRequest());

    return axios({
      method: 'GET',
      url: `https://api.github.com/repos/${fullName}/issues`,
      headers: {
        Authorization: `token ${apiKey}`,
      },
    }).then(({ data }) => {
      // order if we have a cookie
      const repoOrder = getCookie(fullName);
      const sorted = data;

      if (repoOrder) {
        sortByKey({
          array: data,
          order: repoOrder.split(',').map(Number),
          key: 'id',
        });
      }

      dispatch(addIssues({
        data: sorted,
      }));
      dispatch(apiGithubSuccess());
    }).catch((err) => {
      dispatch(apiGithubFailure({
        error: err,
      }));
    });
  };
}
