import React, { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import { fetchAllNotes } from "../utils/api";
import './popup.css'

const Popup = () => {

    const [notes, setnotes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAllNotes();
                console.log(data);
                setnotes(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()

    }, [])

    return (
        <div className="gap-2 p-2">
            <h2>Your Ssummaries</h2>

            {notes.length > 0 ? <div>
                {notes.map((note) => <SummaryCard summary={note.summary} tags={note.hashtags} key={note._id} />)}
            </div> : <div>No Notes yet..</div>}

        </div>
    )
};

export default Popup;
