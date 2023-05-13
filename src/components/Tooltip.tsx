import React from 'react'
import '../assets/tailwind.css'
import SummaryCard from './SummaryCard'

interface ToolTipProps {
    selectedText: string;
}

const Tooltip: React.FC<ToolTipProps> = ({ selectedText }) => {
    return (
        // <div className='fixed z-50 max-w-md text-black bg-purple-300 max-h-60 left-1/4 top-1/4 rounded-xl'>
        //     <div className="max-w-sm overflow-hidden rounded shadow-lg">

        //         <div className="px-6 py-4">
        //             <div className="mb-2 text-xl font-bold">Summary</div>
        //             <p className="text-base text-gray-700">
        //                 {selectedText}
        //             </p>
        //         </div>
        //         <div className="px-6 pt-4 pb-2">
        //             <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#photography</span>
        //             <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#travel</span>
        //             <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#winter</span>
        //         </div>
        //     </div>

        // </div>
        <div className='fixed z-50 max-w-md max-h-60 left-1/4 top-1/4 rounded-xl'>
            <SummaryCard summary={selectedText} />
            </div>
        
    )
}




export default Tooltip