import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import '../assets/tailwind.css'

type Props = {}

const LoadingSummaryCard = (props: Props) => {
    return (
        <div className='fixed z-50 max-w-md bg-purple-300 shadow-lg max-h-60 left-1/4 top-1/4 rounded-xl'>
            <div className="m-5 overflow-hidden text-black ">
                <LoadingSpinner loadingText='Our AI is generating the summary for this text..' />
            </div>

        </div>
    )
}

export default LoadingSummaryCard