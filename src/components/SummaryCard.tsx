import React from 'react'
import '../assets/tailwind.css'
import HashtagContainer from './HashtagContainer'

interface summaryCardProps {
    summeryName?: string;
    summary: string;
    tags?: Array<string>;
}

const SummaryCard: React.FC<summaryCardProps> = ({ summeryName, summary, tags }) => {
    return (

        <div className="max-w-sm m-2 overflow-hidden text-black bg-purple-300 shadow-lg rounded-xl">
            <div className="px-6 py-4">
                <div className="mb-2 text-xl font-bold">{summeryName ? summeryName : 'Summary'} </div>
                <p className="text-base text-gray-700">
                    {summary}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {tags && tags.map((tag,index) => <HashtagContainer tag={tag} key={index}/>)}
                {/* <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#travel</span>
                <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#winter</span> */}
            </div>
        </div>

    )
}

export default SummaryCard