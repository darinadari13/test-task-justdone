import { useEffect } from "react";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';

import 'src/styles/globals.css';
import 'src/styles/colors.css';
import theme from 'src/styles/theme';
import { generateOrGetUserUUID } from "src/utils";

// Must be in secrets/env variables
// to save some time hardcoded them here (but it's bad approach)
const API_HOST = "https://cdn.growthbook.io"
const CLIENT_KEY = "sdk-jZ6PLZY0iNgHcOB"

const growthbook = new GrowthBook({
  apiHost: API_HOST,
  clientKey: CLIENT_KEY,
});


export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const userId = generateOrGetUserUUID()

    growthbook.init({ streaming: true });
    growthbook.setAttributes({
      id: userId,
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GrowthBookProvider growthbook={growthbook}>
        <Component {...pageProps} />
      </GrowthBookProvider>
    </ThemeProvider>
  );
}