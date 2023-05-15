import React, { useEffect, useState } from "react";
import PopupSummaries from "../components/PopupSummaries";
import { fetchAllNotes, sortNotes } from "../utils/api";
import { getStoredToggle, setStoredToggle } from "../utils/storage";
import './popup.css'

const Popup = () => {

    const [notes, setnotes] = useState([]);
    const [sortOrder, setSortOrder] = useState<"Latest" | "Oldest">("Latest");
    const [toggle, setToggle] = useState('Enable')

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as "Latest" | "Oldest");
    };

    const handleClickChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggle === 'Enable' 
        ? setStoredToggle('Disable').then(() => setToggle('Disable')) 
        : setStoredToggle('Enable').then(() => setToggle('Enable'));
    
    };
    useEffect(() => {

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
                console.log('sending message: ', toggle)
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
        <div className="flex flex-col items-center justify-center gap-2 p-2 ">
            <span className="text-red-600"> {toggle === 'Disable' ? 'This plugin is disabled!' : ''}</span>
            <button className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent" onClick={handleClickChange} >
                {toggle === 'Enable' ? 'Disable Plugin' : 'Enable Plugin'}
            </button>
            <h2>Your Summaries</h2>
            <select value={sortOrder} onChange={handleSortChange}>
                <option value="">Sort by Date</option>
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
            </select>
            {notes.length > 0 ? (
                <PopupSummaries notes={sortNotes(sortOrder, notes)} />
            ) : <div>No Notes yet..</div>}

        </div>
    )
};

export default Popup;
