import React, { useState } from 'react'
import '../assets/tailwind.css'

import HashtagContainer from './HashtagContainer'

interface summaryCardProps {
    summeryName?: string;
    summary: string;
    tags?: Array<string>;
}

const SummaryCard: React.FC<summaryCardProps> = ({ summeryName, summary, tags }) => {

    const [isFullTextDisplayed, setFullTextDisplayed] = useState<Boolean>(false);

    const toggleFullText = () => {
        setFullTextDisplayed(!isFullTextDisplayed);
    };

    return (
        <>
            <div className="m-4 overflow-hidden text-black bg-purple-300 shadow-lg rounded-xl">
                <div className="px-6 py-4">
                    <div className="mb-2 text-xl font-bold">{summeryName ? summeryName : 'Summary'} </div>
                    {
                        isFullTextDisplayed ? (<p className="text-base text-gray-700">
                            {summary}
                        </p>) : (<p className="text-base text-gray-700">
                            {summary.substring(0, 260)}....
                        </p>)
                    }
                    {summary.length > 260 && <button id='button' onClick={toggleFullText} className="text-base text-gray-700 underline">
                        {isFullTextDisplayed  ? 'Read Less' : 'Read More'}
                    </button>}
                    
                </div>
                <div className="px-6 pt-4 pb-2">
                    {tags && tags.map((tag, index) => <HashtagContainer tag={tag} key={index} />)}
                </div>
            </div>
        </>

    )
}

export default SummaryCard