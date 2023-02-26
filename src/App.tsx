import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Button, Spinner } from "./components";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-2 bg-slate-300 h-screen">
      <Button>Click Me</Button>

      <Spinner size="lg" width="w-10" height="h-10" borderColor="#f0f0f0" />
    </div>
  );
}

export default App;
