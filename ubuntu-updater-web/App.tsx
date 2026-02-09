
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Configurator } from './components/Configurator';
import { CodeDisplay } from './components/CodeDisplay';
import { generateUpdateScript } from './services/geminiService';
import { ScriptConfig } from './types';
import { Footer } from './components/Footer';

const App: React.FC = () => {
    const [config, setConfig] = useState<ScriptConfig>({
        language: 'bash',
        autoUpdate: false,
        notifications: {
            email: false,
            whatsapp: false,
            telegram: false,
        },
    });
    const [generatedScript, setGeneratedScript] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateScript = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedScript('');
        try {
            const script = await generateUpdateScript(config);
            setGeneratedScript(script);
        } catch (err) {
            setError('Failed to generate script. Please check your API key and try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [config]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <Configurator 
                        config={config} 
                        setConfig={setConfig}
                        onGenerate={handleGenerateScript}
                        isLoading={isLoading}
                    />
                    <CodeDisplay 
                        script={generatedScript} 
                        isLoading={isLoading} 
                        error={error} 
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
