import { useState } from "react";
import { Accordion, Button, Chip, Modal, Select, Spinner } from "./components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2 h-screen">
      <Button ripple onClick={() => setIsOpen(!isOpen)} size="sm">
        Click Me
      </Button>
      <Button variant="contained" size="md" isLoading>
        Aasim Sayyed
      </Button>
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
      <Chip
        variant="outlined"
        title="Aasim Sayyed was here"
        isClickable
        onDelete={() => console.log(">>>")}
        size="lg"
      />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        size="lg"
        closeOnOverlayClick={true}
        verticalAlign="center"
        id="aasim"
        title="Test Modal"
      >
        Test Modal Body
        <Button ripple size="sm">
          Aasim Sayyed
        </Button>
      </Modal>
      <hr className="my-5" />
      <Select
        options={[
          {
            label: "aasim",
            value: "aasim",
          },
          {
            label: "sayyed",
            value: "sayyed",
          },
          {
            label: "zahid",
            value: "zahid",
          },
          {
            label: "aasim",
            value: "aasim",
          },
          {
            label: "sayyed",
            value: "sayyed",
          },
          {
            label: "zahid",
            value: "zahid",
            newMan:'aasim'
          },
        ]}
        onChange={(ele)=>console.log(ele)}
        placeholder=""
        isDisabled
        size='md'
      />
    </div>
  );
}

export default App;
