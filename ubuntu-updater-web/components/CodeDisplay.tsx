
import React, { useState, useEffect } from 'react';

interface CodeDisplayProps {
    script: string;
    isLoading: boolean;
    error: string | null;
}

const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
    </svg>
);

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


export const CodeDisplay: React.FC<CodeDisplayProps> = ({ script, isLoading, error }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (script) {
            setCopied(false);
        }
    }, [script]);

    const handleCopy = () => {
        navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg font-semibold">Generating your script...</p>
                    <p className="text-sm">The AI is crafting the perfect automation for you.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-semibold text-center">An Error Occurred</p>
                    <p className="text-sm text-center">{error}</p>
                </div>
            );
        }

        if (!script) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-300">Your Script Will Appear Here</h3>
                    <p className="text-center mt-2">Configure your options on the left and click "Generate Script" to start.</p>
                </div>
            );
        }

        return (
            <>
                <div className="absolute top-4 right-4">
                    <button 
                        onClick={handleCopy} 
                        className="flex items-center gap-2 bg-gray-900/50 hover:bg-gray-900 text-gray-300 font-semibold py-2 px-3 rounded-md transition-colors duration-200 border border-gray-600"
                    >
                        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <pre className="h-full w-full overflow-auto p-4 pt-16">
                    <code className="language-bash text-sm font-mono whitespace-pre-wrap break-words">
                        {script}
                    </code>
                </pre>
            </>
        );
    };

    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 relative min-h-[400px] lg:min-h-0 h-full flex flex-col">
            {renderContent()}
        </div>
    );
};
