// import App from 'next/app'
import { useState } from "react";
import Router from 'next/router';

import { Spin } from "antd";

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  Router.onRouteChangeStart = () => {
    console.log('onRouteChangeStart triggered');
    setLoading(true);
  };

  Router.onRouteChangeComplete = () => {
    console.log('onRouteChangeComplete triggered');
    setLoading(false);
  };
  
  Router.onRouteChangeError = () => {
    console.log('onRouteChangeError triggered');
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <Component {...pageProps} />
    </Spin>
  )
}
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
export default MyApp;  