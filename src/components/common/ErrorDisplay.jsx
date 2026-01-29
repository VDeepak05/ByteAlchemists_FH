import React from 'react';

const ErrorDisplay = ({ message = 'An error occurred', onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800/50">
            <span className="material-symbols-outlined text-5xl text-red-500 mb-3">error</span>
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">
                Oops! Something went wrong
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4 text-center max-w-md">
                {message}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorDisplay;
