
import { GoogleGenAI } from "@google/genai";
import { ScriptConfig } from '../types';

const buildPrompt = (config: ScriptConfig): string => {
    const { language, autoUpdate, notifications } = config;
    const activeNotifications = Object.entries(notifications)
        .filter(([, isActive]) => isActive)
        .map(([service]) => service);

    let prompt = `
You are an expert Linux system administrator and programmer specializing in creating reliable automation scripts.
Your task is to generate a complete, production-ready ${language} script for an Ubuntu server based on the following requirements.

**Core Requirements:**
1.  **Check for Updates:** The script must begin by running 'apt-get update' to refresh the package lists.
2.  **Identify Upgradable Packages:** It must identify which packages have available updates.
3.  **Handle Execution:** The script should be executable directly from the command line.

**Configurable Options:**
-   **Language:** ${language}
-   **Automatic Updates:** ${autoUpdate ? 'Enabled' : 'Disabled'}. ${autoUpdate ? "If enabled, the script must automatically install all available updates using 'apt-get upgrade -y' after checking." : "If disabled, the script should only report on available updates, not install them."}
-   **Notifications:** ${activeNotifications.length > 0 ? `Enabled for: ${activeNotifications.join(', ')}` : 'Disabled'}.

**Notification Implementation Details:**
${notifications.email ? `
-   **Email:** Send a notification email.
    -   For Bash, use the 'mail' or 'ssmtp' command. The script should assume it's configured.
    -   For Python, use the 'smtplib' library.
    -   The email body should list the packages that are available for upgrade (or were upgraded if auto-update is on).
    -   Use clear placeholders for user-configurable variables (e.g., RECIPIENT_EMAIL, SENDER_EMAIL, SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD).` : ''}
${notifications.telegram ? `
-   **Telegram:** Send a message via the Telegram Bot API.
    -   For Bash, use 'curl'.
    -   For Python, use the 'requests' library.
    -   The message should list the upgradable/upgraded packages.
    -   Use placeholders for the Bot Token (TELEGRAM_BOT_TOKEN) and Chat ID (TELEGRAM_CHAT_ID).` : ''}
${notifications.whatsapp ? `
-   **WhatsApp:** Send a message using a third-party gateway like Twilio.
    -   Clearly state in the comments that this requires a third-party service.
    -   For Bash, use 'curl'.
    -   For Python, use the 'requests' library.
    -   Use placeholders for the Twilio Account SID (TWILIO_ACCOUNT_SID), Auth Token (TWILIO_AUTH_TOKEN), Twilio phone number (TWILIO_PHONE_NUMBER), and recipient's number (RECIPIENT_PHONE_NUMBER).` : ''}

**Output Requirements:**
-   Provide ONLY the raw script code.
-   Do not include any explanations, introductory text, or markdown formatting like \`\`\`bash or \`\`\`python.
-   The script must be well-commented, explaining each major step.
-   Include a shebang line (e.g., #!/bin/bash or #!/usr/bin/env python3).
-   Define all user-configurable variables (like API keys, email addresses) at the top of the script for easy modification.
-   Ensure the script handles the case where there are no updates available gracefully.
`;

    return prompt.trim();
};

export const generateUpdateScript = async (config: ScriptConfig): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = buildPrompt(config);

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
};
