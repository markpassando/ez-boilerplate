import React from 'react';

// staticContext comes from Server Side context
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>404</h1>;
}

export default {
  component: NotFoundPage
};