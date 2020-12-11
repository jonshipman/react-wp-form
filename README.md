# react-wp-gql

> WordPress Rendering and Routing for WP-GraphQL.

![GitHub](https://img.shields.io/github/license/jonshipman/react-wp-gql) ![GitHub last commit](https://img.shields.io/github/last-commit/jonshipman/react-wp-gql)

## Install

```bash
yarn add https://github.com/jonshipman/react-wp-gql
```

## Usage

```jsx
// React
import React from "react";
import { Switch, Route } from "react-router-dom";
import { WordPressRoutes, NodeProvider } from "react-boilerplate-nodes";
import { FormGroup } from "react-boilerplate-leadform";
import { Header, Footer, Main } from "./layout";
import { Home } from "./home";
import * as queries from "./gql/queries";
import "./app.scss";

const nodeProps = {
  queries,
  components: {
    FormGroup,
  },
};

export const App = () => (
  <NodeProvider {...nodeProps}>
    <Header />
    <Main>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <WordPressRoutes />
      </Switch>
    </Main>
    <Footer />
  </NodeProvider>
);

```

## License

Apache 2.0 © [jonshipman](https://github.com/jonshipman)
