import React from 'react'
import SummaryCard from './SummaryCard'

interface note {
    createdAt: string,
    selectedText: string,
    summary: string,
    updatedAt: string,
    _id: string,
    _v: number,
    hashtags: Array<string>
}

interface PopupSummariesProps {

    notes: Array<note>;
}


const PopupSummaries: React.FC<PopupSummariesProps> = ({ notes }) => {
    return (
        <div>

            {notes.map((note) => <SummaryCard summary={note.summary} tags={note.hashtags} key={note._id} />)}
        </div>
    )
}

export default PopupSummaries