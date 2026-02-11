import React from 'react'

const Loading = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 p-8 bg-white shadow-2xl rounded-2xl">
                {/* Rounded Loading State (Spinner) */}
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-100 rounded-full"></div>
                    <div className="absolute top-0 w-16 h-16 border-4 border-t-primary rounded-full animate-spin"></div>
                </div>
                <p className="text-lg font-semibold tracking-wide text-primary animate-pulse">Loading...</p>
            </div>
        </div>
    )
}

export default Loading