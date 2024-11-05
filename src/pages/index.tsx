import { useFeatureIsOn } from "@growthbook/growthbook-react";

import PageWithTimer from "./timer"; 
import PageWithoutTimer from "./without-timer" 



const HomePage = () => {
  const enabled = useFeatureIsOn("timer-feature");

  if (enabled) {
    return <PageWithTimer />
  } else {
    return <PageWithoutTimer />;
  }
};

export default HomePage;
