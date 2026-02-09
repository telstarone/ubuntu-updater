
import React from 'react';
import { ScriptConfig, ScriptLanguage, NotificationOptions } from '../types';

interface ConfiguratorProps {
    config: ScriptConfig;
    setConfig: React.Dispatch<React.SetStateAction<ScriptConfig>>;
    onGenerate: () => void;
    isLoading: boolean;
}

const PythonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.23 19.32c.55-.28.88-.85.88-1.48V15c0-.6-.3-1.14-.8-1.44l-4.23-2.5c-.5-.3-1.1-.3-1.6 0l-4.24 2.5c-.5.3-.8.84-.8 1.44v2.84c0 .63.33 1.2.88 1.48l4.24 2.1c.5.24 1.1.24 1.6 0l4.23-2.1zM9.77 4.68c-.55.28-.88.85-.88 1.48V9c0 .6.3 1.14.8 1.44l4.23 2.5c.5.3 1.1.3 1.6 0l4.24-2.5c.5-.3.8-.84.8-1.44V6.16c0-.63-.33-1.2-.88-1.48l-4.24-2.1c-.5-.24-1.1-.24-1.6 0l-4.23 2.1z" fill="#306998"/>
    <path d="M14.23 19.32c.55-.28.88-.85.88-1.48V15c0-.6-.3-1.14-.8-1.44l-4.23-2.5c-.5-.3-1.1-.3-1.6 0l-4.24 2.5c-.5.3-.8.84-.8 1.44v2.84c0 .63.33 1.2.88 1.48l4.24 2.1c.5.24 1.1.24 1.6 0l4.23-2.1z" fill="#FFD43B"/>
  </svg>
);

const BashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m4 17 6-6-6-6"></path><path d="m10 19h10"></path>
    </svg>
);

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>
    </svg>
);

const ZapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

const GenerateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

export const Configurator: React.FC<ConfiguratorProps> = ({ config, setConfig, onGenerate, isLoading }) => {
    
    const handleLanguageChange = (lang: ScriptLanguage) => {
        setConfig(prev => ({ ...prev, language: lang }));
    };

    const handleAutoUpdateToggle = () => {
        setConfig(prev => ({ ...prev, autoUpdate: !prev.autoUpdate }));
    };
    
    const handleNotificationChange = (service: keyof NotificationOptions) => {
        setConfig(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [service]: !prev.notifications[service],
            },
        }));
    };

    const isGenerateDisabled = isLoading || Object.values(config.notifications).every(v => !v) && !config.autoUpdate;

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 border border-gray-700/50 flex flex-col gap-8">
            <div>
                <h2 className="text-xl font-bold text-cyan-300 mb-1">Step 1: Choose Script Language</h2>
                <p className="text-gray-400 mb-4">Bash is simple and native, while Python offers more robust error handling and libraries.</p>
                <div className="grid grid-cols-2 gap-4">
                    <LanguageButton icon={<BashIcon className="w-6 h-6 mr-3 text-cyan-400"/>} label="Bash" value="bash" selected={config.language} onClick={handleLanguageChange} />
                    <LanguageButton icon={<PythonIcon className="w-6 h-6 mr-3"/>} label="Python" value="python" selected={config.language} onClick={handleLanguageChange} />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-cyan-300 mb-4">Step 2: Configure Actions</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center">
                            <ZapIcon className="w-5 h-5 mr-3 text-yellow-400" />
                            <div>
                                <label htmlFor="autoUpdate" className="font-semibold text-white">Automatic Updates</label>
                                <p className="text-sm text-gray-400">Automatically install updates when found.</p>
                            </div>
                        </div>
                        <label htmlFor="autoUpdate" className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="autoUpdate" className="sr-only peer" checked={config.autoUpdate} onChange={handleAutoUpdateToggle} />
                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-cyan-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-cyan-300 mb-4">Step 3: Set Up Alerts</h2>
                <p className="text-gray-400 mb-4">Get notified when updates are available or have been installed.</p>
                <div className="space-y-4">
                    <NotificationCheckbox icon={<MailIcon className="w-5 h-5 mr-3 text-red-400"/>} label="Email" service="email" checked={config.notifications.email} onChange={handleNotificationChange} />
                    <NotificationCheckbox icon={<SendIcon className="w-5 h-5 mr-3 text-blue-400"/>} label="Telegram" service="telegram" checked={config.notifications.telegram} onChange={handleNotificationChange} />
                    <NotificationCheckbox icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-green-400" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 14.2l-2.8-1.5c-.3-.1-.6 0-.8.2l-1.3 1.6c-2.3-1.2-4.1-3-5.3-5.3l1.6-1.3c.2-.2.3-.5.2-.8l-1.5-2.8c-.1-.3-.4-.4-.7-.4h-2.1c-.4 0-.7.3-.7.7 0 7.8 6.3 14.1 14.1 14.1.4 0 .7-.3.7-.7v-2.1c0-.3-.2-.6-.5-.7z"></path></svg>} label="WhatsApp" description="(via Twilio)" service="whatsapp" checked={config.notifications.whatsapp} onChange={handleNotificationChange} />
                </div>
            </div>
            
            <div className="mt-auto pt-6">
                <button 
                    onClick={onGenerate} 
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                >
                    <GenerateIcon className="w-6 h-6" />
                    {isLoading ? 'Generating Script...' : 'Generate Script'}
                </button>
                {isGenerateDisabled && !isLoading && (
                    <p className="text-center text-xs text-yellow-400 mt-3">Please select at least one action (Auto-update or an Alert type) to generate a script.</p>
                )}
            </div>
        </div>
    );
};

interface LanguageButtonProps {
    icon: React.ReactNode;
    label: string;
    value: ScriptLanguage;
    selected: ScriptLanguage;
    onClick: (value: ScriptLanguage) => void;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ icon, label, value, selected, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
            selected === value 
            ? 'bg-cyan-500/20 border-cyan-400 text-white' 
            : 'bg-gray-700/50 border-gray-600 hover:border-gray-500 text-gray-300'
        }`}
    >
        {icon}
        <span className="font-semibold text-lg">{label}</span>
    </button>
);

interface NotificationCheckboxProps {
    icon: React.ReactNode;
    label: string;
    description?: string;
    service: keyof NotificationOptions;
    checked: boolean;
    onChange: (service: keyof NotificationOptions) => void;
}

const NotificationCheckbox: React.FC<NotificationCheckboxProps> = ({ icon, label, description, service, checked, onChange }) => (
    <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        checked 
        ? 'bg-gray-600/50 border-cyan-500' 
        : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
    }`}>
        <input type="checkbox" className="sr-only" checked={checked} onChange={() => onChange(service)} />
        {icon}
        <span className="font-semibold text-white">{label}</span>
        {description && <span className="text-sm text-gray-400 ml-1">{description}</span>}
        <div className={`w-6 h-6 ml-auto flex items-center justify-center rounded-md border-2 ${checked ? 'bg-cyan-500 border-cyan-400' : 'border-gray-500'}`}>
            {checked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
        </div>
    </label>
);

