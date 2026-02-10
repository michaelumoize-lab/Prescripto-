import React from 'react'

const Loading = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-primary animate-spin"></div>
                <p className="font-medium text-primary">Loading...</p>
            </div>
        </div>
    )
}

export default Loading