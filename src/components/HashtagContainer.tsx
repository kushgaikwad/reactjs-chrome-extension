import React from 'react'

interface HashtagContainerProps  {
    tag: string;
}

const HashtagContainer: React.FC<HashtagContainerProps> = ({tag}) => {
  return (
    <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">{tag}</span>
  )
}

export default HashtagContainer