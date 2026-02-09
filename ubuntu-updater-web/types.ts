
export type ScriptLanguage = 'bash' | 'python';

export interface NotificationOptions {
    email: boolean;
    whatsapp: boolean;
    telegram: boolean;
}

export interface ScriptConfig {
    language: ScriptLanguage;
    autoUpdate: boolean;
    notifications: NotificationOptions;
}
