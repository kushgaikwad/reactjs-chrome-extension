import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'
import LoadingSpinner from "../components/LoadingSpinner";
import LoadingSummaryCard from "../components/LoadingSummaryCard";
import SummaryCard from "../components/SummaryCard";
import { getSummaryAndTagsFromAI } from "../utils/api";

const App: React.FC<{}> = () => {

  const [textSelected, setTextSelected] = useState(null);
  const [hashtags, setHashtags] = useState<Array<string>>([]);
  const [generatedSummary, setgeneratedSummary] = useState('')
  const [toggle, settoggle] = useState('Enable');
  //const [tooltipTop, settooltipTop] = useState(0)
  const [isLoading, setisLoading] = useState(false)

  const getSelectedText = () => window.getSelection().toString();

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
      //console.log(request)
      settoggle(request.toggle);
    }
  );

  document.addEventListener("click", () => {
    if (getSelectedText().length > 1) {

      let range = window.getSelection().getRangeAt(0);
      let newNode = document.createElement("span");
      newNode.innerHTML = getSelectedText();
      range.deleteContents();
      range.insertNode(newNode);
      //settooltipTop(newNode.getBoundingClientRect().top)
      newNode.addEventListener('click', async () => {
        if (toggle === 'Enable') {
          console.log(getSelectedText());
          try {
            setisLoading(true);
            const data = await getSummaryAndTagsFromAI(getSelectedText());
            console.log(data)
            setisLoading(false)
            setgeneratedSummary(data.summary);
            setHashtags(data.hashtags);
            setTextSelected(getSelectedText());

          } catch (error) {
            setisLoading(false)
            console.error(error)
          }
        }
      });
    }
    else {
      setTextSelected(null);
    }
  });

  return (
    <>
    {isLoading && <div className={`fixed z-50 max-w-md max-h-60 left-1/4 top-1/4 rounded-xl`}>
            <LoadingSummaryCard/>
          </div>  }
      {textSelected && (   
           <div className={`fixed z-50 max-w-md max-h-60 left-1/4 top-1/4 rounded-xl`}>
            <SummaryCard summeryName="Smart summary from Frontdoor" summary={generatedSummary} tags={hashtags} />
          </div> 
      )}

    </>

  )
}

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);
const root = createRoot(appContainer);
root.render(<App />);