import { AppProvider } from "./store/Provider";
import MathTrainer from "./screens/MathTrainer";
import OnboardScreen from "./screens/Onboard";
import ResultScreen from "./screens/Result/Result";

function App() {
  return (
    <AppProvider>
      <OnboardScreen />
      <MathTrainer />
      <ResultScreen />
    </AppProvider>
  );
}

export default App;
