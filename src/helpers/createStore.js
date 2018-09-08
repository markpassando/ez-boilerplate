import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

export default (req) => {
  // Use custom server side instance of axios so it can be used by the server and client. Must use full URL
  // Server side must proxy and pass cookie from user in order to render server side html that requires auth
  const axiosInstance = axios.create({
    baseURL: 'https://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie' || '')}
  });

  const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));
  
  return store;
};