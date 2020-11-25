import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, CssBaseline, Typography } from '@material-ui/core';
import theme from './theme';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';
import AuthProvider from './auth';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography component="h1" variant="h6" align="center">
          Oops! Something went wrong ...
        </Typography>
      );
    } else {
      return this.props.children;
    }
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <AuthProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </MuiThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
