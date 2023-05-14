import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'
import SummaryCard from "../components/SummaryCard";
import { getSummaryAndTagsFromAI } from "../utils/api";

const App: React.FC<{}> = () => {

  const [textSelected, setTextSelected] = useState(null);
  const [hashtags, setHashtags] = useState<Array<string>>([]);
  const [generatedSummary, setgeneratedSummary] = useState('')

  const getSelectedText = () => window.getSelection().toString();

  document.addEventListener("click", () => {
    if (getSelectedText().length > 1) {
      let range = window.getSelection().getRangeAt(0);
      let newNode = document.createElement("span");
      newNode.innerHTML = getSelectedText();
      range.deleteContents();
      range.insertNode(newNode);
      newNode.addEventListener('click', async () => {
        console.log(getSelectedText());
        try {
          const data = await getSummaryAndTagsFromAI(getSelectedText());
          console.log(data)
          setgeneratedSummary(data.summary);
          setHashtags(data.hashtags);
          setTextSelected(getSelectedText());

        } catch (error) {
          console.error(error)
        }
      });
    }
    else {
      setTextSelected(null);
    }
  });

  return (
    <>
      {textSelected && (
        <div className='fixed z-50 max-w-md max-h-60 left-1/4 top-1/4 rounded-xl'>
          <SummaryCard summary={generatedSummary} tags={hashtags} />
        </div>
      ) }

    </>

  )
}

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);
const root = createRoot(appContainer);
root.render(<App />);
