import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const skeletons = Array.from({ length: count }, (_, i) => i);

    const renderCardSkeleton = () => (
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-border-dark p-6 animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-surface-dark-elevated rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-slate-200 dark:bg-surface-dark-elevated rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-slate-200 dark:bg-surface-dark-elevated rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-surface-dark-elevated rounded w-5/6"></div>
        </div>
    );

    const renderTableRowSkeleton = () => (
        <tr className="animate-pulse">
            <td className="px-4 py-4">
                <div className="h-4 bg-slate-200 dark:bg-surface-dark-elevated rounded w-24"></div>
            </td>
            <td className="px-4 py-4">
                <div className="h-4 bg-slate-200 dark:bg-surface-dark-elevated rounded w-20"></div>
            </td>
            <td className="px-4 py-4">
                <div className="h-4 bg-slate-200 dark:bg-surface-dark-elevated rounded w-16"></div>
            </td>
            <td className="px-4 py-4">
                <div className="h-4 bg-slate-200 dark:bg-surface-dark-elevated rounded w-20"></div>
            </td>
        </tr>
    );

    const renderListSkeleton = () => (
        <div className="flex items-center gap-3 p-4 animate-pulse">
            <div className="w-12 h-12 bg-slate-200 dark:bg-surface-dark-elevated rounded-full"></div>
            <div className="flex-1">
                <div className="h-4 bg-slate-200 dark:bg-surface-dark-elevated rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-surface-dark-elevated rounded w-1/2"></div>
            </div>
        </div>
    );

    if (type === 'card') {
        return (
            <div className="space-y-4">
                {skeletons.map((i) => (
                    <div key={i}>{renderCardSkeleton()}</div>
                ))}
            </div>
        );
    }

    if (type === 'table') {
        return (
            <>
                {skeletons.map((i) => (
                    <React.Fragment key={i}>{renderTableRowSkeleton()}</React.Fragment>
                ))}
            </>
        );
    }

    if (type === 'list') {
        return (
            <div className="space-y-2">
                {skeletons.map((i) => (
                    <div key={i}>{renderListSkeleton()}</div>
                ))}
            </div>
        );
    }

    return null;
};

export default SkeletonLoader;
