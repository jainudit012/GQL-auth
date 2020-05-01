import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import Header from './components/Header'
import AppComponent from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch >
          <Header> 
            <Route path="/" component={AppComponent} exact />
            <Route path="/login" component={LoginForm} exact />
            <Route path="/signup" component={SignupForm} exact />
          </Header>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
