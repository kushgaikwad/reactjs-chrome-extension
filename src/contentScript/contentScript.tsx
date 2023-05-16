import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import '../assets/tailwind.css'
import LoadingSummaryCard from "../components/LoadingSummaryCard";
import SummaryCard from "../components/SummaryCard";
import { getSummaryAndTagsFromAI } from "../utils/api";

const App: React.FC<{}> = () => {

  const [textSelected, setTextSelected] = useState(null);
  const [hashtags, setHashtags] = useState<Array<string>>([]);
  const [generatedSummary, setgeneratedSummary] = useState('')
  const [toggle, settoggle] = useState('Enable');
  const [isLoading, setisLoading] = useState(false)

  const getSelectedText = () => window.getSelection().toString();

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
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
    
      newNode.addEventListener('click', async () => {
        if (toggle === 'Enable') {
      
          try {
            setisLoading(true);
            const data = await getSummaryAndTagsFromAI(getSelectedText());
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
export default App;

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);
const root = createRoot(appContainer);
root.render(<App />);