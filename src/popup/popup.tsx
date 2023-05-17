import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PopupSummaries from "../components/PopupSummaries";
import { fetchAllNotes, sortNotes } from "../utils/api";
import { getStoredToggle, setStoredToggle } from "../utils/storage";
import './popup.css'

const Popup = () => {

    const [notes, setnotes] = useState([]);
    const [sortOrder, setSortOrder] = useState<"Latest" | "Oldest">("Latest");
    const [toggle, setToggle] = useState('Enable');

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setSortOrder(event.target.value as "Latest" | "Oldest");

    };

    const handleClickChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggle === 'Enable'
            ? setStoredToggle('Disable').then(() => setToggle('Disable'))
            : setStoredToggle('Enable').then(() => setToggle('Enable'));

    };
    useEffect(() => {

        //This is to show I am comfrtable with both 'then' keyword and 'async/await' keywords
        getStoredToggle().then((toggle) => setToggle(toggle))
        const fetchData = async () => {
            try {
                const data = await fetchAllNotes();
                console.log(data);
                setnotes(data)
            } catch (error) {
                console.log(error);
            }
        }
        const sendToggle = async () => {
            try {
                const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
                const response = await chrome.tabs.sendMessage(tab.id, { toggle });
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
        sendToggle();
    }, [toggle])

    return (

        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-white to-purple-100">
            <h1 className="mt-4 text-3xl font-extrabold leading-none tracking-tight text-black md:text-3xl lg:text-4xl">Frontdoor Smart Summary</h1>
            <p className="m-4 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Highlight any paragraph by selecting and clicking on it to get AI assisted smart summary.</p>
            {toggle == 'Disable' && <p className="m-1 mb-3 font-normal text-center text-red-500 text-md lg:text-xl sm:px-16 xl:px-48">This plugin is disabled currently!</p>}
            <button onClick={handleClickChange} className={`inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white ${toggle === 'Enable' ? 'bg-red-600 hover:bg-red-700 ' : 'bg-lime-500 hover:bg-lime-600'} rounded-lg`}>{toggle === 'Enable' ? 'Disable Plugin' : 'Enable Plugin'}</button>
            <h1 className="m-4 text-2xl font-extrabold leading-none tracking-tight text-black md:text-3xl lg:text-4xl">Your saved summaries</h1>
            <select value={sortOrder} onChange={handleSortChange} className=" bg-gray-200 border border-gray-300 text-sm rounded-lg block w-1/4 p-2.5" >
                <option value="">Sort by Date</option>
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
            </select>
            {notes.length > 0 ? (
                <PopupSummaries notes={sortNotes(sortOrder, notes)} />
            ) : <LoadingSpinner loadingText="Getting your saved summaries..." />}
        </div>
    )
};

export default Popup;
