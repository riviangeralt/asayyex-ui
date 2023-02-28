import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Accordion, Button, Chip, Spinner } from "./components";
import componentWithRipple from "./hoc/withRipple";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const ButtonWithRipple = componentWithRipple(Button);
  const ChipWithRipple = componentWithRipple(Chip);

  return (
    <div className="p-2 bg-slate-300 h-screen">
      <Button ripple onClick={()=>console.log('asaas')}>Click Me</Button>

      <Spinner size="lg" width="w-10" height="h-10" borderColor="#f0f0f0" />

      <Accordion title="Accordion Header Example">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Accordion>
      <ButtonWithRipple>Aasim</ButtonWithRipple>
      <ChipWithRipple variant="contained"/>
      <Chip variant="outlined" />
    </div>
  );
}

export default App;
