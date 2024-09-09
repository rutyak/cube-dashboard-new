import cubejs from '@cubejs-client/core';

const API_URL = process.env.REACT_APP_CUBE_API_URL;
const Tocken = process.env.REACT_APP_CUBE_API_TOKEN;

const cubejsApi = cubejs(Tocken, {
  apiUrl: API_URL,
});

export default cubejsApi;
