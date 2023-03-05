import { useState } from "react";
import {
  Button,
  DatePicker,
  Drawer,
  Modal,
  Select,
  TextField,
} from "./components";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
  };

  console.log(selectedDate);
  return (
    <div className="p-2 h-screen flex gap-4 items-start">
      <Select
        options={[
          { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
          { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
          { value: "purple", label: "Purple", color: "#5243AA" },
          { value: "red", label: "Red", color: "#FF5630", isFixed: true },
          { value: "orange", label: "Orange", color: "#FF8B00" },
          { value: "yellow", label: "Yellow", color: "#FFC400" },
          { value: "green", label: "Green", color: "#36B37E" },
          { value: "forest", label: "Forest", color: "#00875A" },
          { value: "slate", label: "Slate", color: "#253858" },
          { value: "silver", label: "Silver", color: "#666666" },
        ]}
        onChange={(ele) => console.log(ele)}
        placeholder="Search Something..."
        // isDisabled
        size="md"
        defaultValue={{ value: "silver", label: "Silver", color: "#666666" }}
        // error={true}
      />

      <TextField
        placeholder="Type Something..."
        leftIcon={"+91"}
        type="number"
        maxLength={10}
        error
        defaultValue={44}
        size="md"
      />
      <Button onClick={() => setIsOpen(!isOpen)} size="sm" ripple>
        Open Modal
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        closeOnOverlayClick
        title="Modal Title"
        footer={
          <div className="flex gap-2">
            <Button onClick={() => setIsOpen(!isOpen)} variant='outlined' ripple>Close</Button>
            <Button onClick={() => setIsOpen(!isOpen)} ripple>Save</Button>
          </div>
        }
        verticalAlign='center'
      >
        <div className="text-xl font-bold mb-4">
          You can scroll the content behind the modal
        </div>
        <DatePicker
        onDateChange={handleDateChange}
        value={selectedDate}
      />
        <p className="text-lg">
          Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
          deserunt aute id consequat veniam incididunt duis in sint irure nisi.
          Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor
          esse quis. Sunt ad dolore quis aute consequat. Magna exercitation
          reprehenderit magna aute tempor cupidatat consequat elit dolor
          adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
          Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
          eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
          pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
        </p>
      </Modal>

      {/* <Drawer
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        closeOnOverlayClick
        title="Drawer Title"
        footer={
          <div className="flex gap-2" hidden>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="outlined"
              ripple
            >
              Close
            </Button>
            <Button onClick={() => setIsOpen(!isOpen)} ripple>
              Save
            </Button>
          </div>
        }
        position="left"
        size="sm"
      >
        <div className="text-xl font-bold mb-4">
          You can scroll the content behind the Drawer
        </div>

        <p className="text-lg">
          Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco
          deserunt aute id consequat veniam incididunt duis in sint irure nisi.
          Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor
          esse quis. Sunt ad dolore quis aute consequat. Magna exercitation
          reprehenderit magna aute tempor cupidatat consequat elit dolor
          adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
          Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
          eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
          pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
        </p>
        <div className="text-xl font-bold mb-4">
          You can scroll the content behind the Drawer
        </div>
      </Drawer> */}
    </div>
  );
}

export default App;
