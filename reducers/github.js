import {
  ADD_GITHUB_REPOS,
  ADD_GITHUB_ISSUES,
  API_GITHUB_REQUEST,
  API_GITHUB_SUCCESS,
  API_GITHUB_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  repos: [],
  issues: [],
  isFetching: false,
  error: null,
};

export default function github(state = initialState, action) {
  switch (action.type) {
    case ADD_GITHUB_REPOS: {
      return {
        ...state,
        repos: action.payload.data.filter(d => d.open_issues > 0),
      };
    }
    case ADD_GITHUB_ISSUES: {
      return {
        ...state,
        issues: action.payload.data,
      };
    }
    case API_GITHUB_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case API_GITHUB_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case API_GITHUB_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
