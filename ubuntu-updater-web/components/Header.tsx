
import React from 'react';

const TerminalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="py-6 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <TerminalIcon className="w-8 h-8 text-cyan-400" />
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Ubuntu Update Script Generator</h1>
                </div>
                <p className="text-lg text-gray-400">
                    Automate your server maintenance with custom Bash or Python scripts.
                </p>
            </div>
        </header>
    );
};
