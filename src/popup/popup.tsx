import React from "react";
import SummaryCard from "../components/SummaryCard";
import './popup.css'

const Popup = () => {
    return (
        <div className="gap-2 p-2">
            <h2>Your Summaries</h2>
            <SummaryCard summary='Ths is summary 1' />
            <SummaryCard summary='Ths is summary 2' />
            <SummaryCard summary='Ths is summary 3' />
            <SummaryCard summary='Ths is summary 4' />
        </div>
    )
};

export default Popup;