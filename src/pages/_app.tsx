import 'src/styles/globals.css';
import 'src/styles/colors.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'src/styles/theme';
import { useEffect } from "react";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";

const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-jZ6PLZY0iNgHcOB",
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    // TODO: Use your real analytics tracking system
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key
    });
  }
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
  });
}

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