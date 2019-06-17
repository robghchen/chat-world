import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import { configure } from "radiks";

import { userSession, appConfig } from "../src/utils/blockstack";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {
      userSession
    };

    if (Component.getInitialProps) {
      configure({
        apiServer: process.env.RADIKS_API_SERVER,
        userSession
      });

      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentWillMount() {
    configure({
      apiServer: process.env.RADIKS_API_SERVER,
      userSession
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={{}}>
        <Container>
          <Component {...pageProps} serverCookies={this.props.cookies} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default MyApp;
