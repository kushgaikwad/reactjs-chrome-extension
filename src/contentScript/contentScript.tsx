import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'
import SummaryCard from "../components/SummaryCard";
import Tooltip from "../components/Tooltip";

const App: React.FC<{}> = () => {

  const [textSelected, setTextSelected] = useState(null)

  const getSelectedText = () => window.getSelection().toString();

  document.addEventListener("click", () => {
    if (getSelectedText().length > 0) {
      let range = window.getSelection().getRangeAt(0);
      let newNode = document.createElement("span");
      newNode.innerHTML = getSelectedText();
      range.deleteContents();
      range.insertNode(newNode);
      newNode.addEventListener('click', () => {
        console.log(getSelectedText());
        setTextSelected(getSelectedText());

      });
    }
    else {
      setTextSelected(null);
    }
  });

  return (
    <>
      {textSelected && <Tooltip selectedText={textSelected} />}
      
    </>

  )
}

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);
const root = createRoot(appContainer);
root.render(<App />);
