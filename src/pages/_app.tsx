import { useEffect } from "react";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';

import 'src/styles/globals.css';
import 'src/styles/colors.css';
import theme from 'src/styles/theme';
import { generateUUID } from "src/utils";

const API_HOST = "https://cdn.growthbook.io"
const CLIENT_KEY = "sdk-jZ6PLZY0iNgHcOB"

const growthbook = new GrowthBook({
  apiHost: API_HOST,
  clientKey: CLIENT_KEY,
  enableDevMode: true,
  // trackingCallback: (experiment, result) => {
  //   console.log("Viewed Experiment", {
  //     experimentId: experiment.key,
  //     variationId: result.key
  //   });
  // }
});


const userId = generateUUID()

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
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