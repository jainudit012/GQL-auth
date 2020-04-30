import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import AppComponent from './components/App'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch >
          <Route path="/" component={AppComponent} exact/>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
