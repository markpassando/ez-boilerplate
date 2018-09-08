import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));
app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore(req);
  
  // Determines Components that are about to render and calls loadData
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  })
  .map(promise => {
    // One failed promise will fall out of promise.all
    // Returns a promise stating whether the promise was successful or not
    if (promise) {
      return new Promise((resolve, reject) => {
        // Always pass resolve so Promise.all will not fall out
        promise.then(resolve).catch(resolve);
      })
    }
  });

  // All promises will be valid to avoid hanging, the page will attempt to render partially if a promise has failed
  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);
    
    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404)
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Listnening on port 3000')
});