import { askAI } from '../services/ai.js';

export function Chatbot() {
    const container = document.createElement('div');
    container.className = 'w-full h-full flex-col';
    container.style.maxWidth = '900px';
    container.style.margin = '0 auto';
    container.style.height = 'calc(100vh - 140px)';

    // Header (Settings)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4';

    const spacer = document.createElement('div');

    const settingsBtn = document.createElement('button');
    settingsBtn.innerText = '⚙️ Configurar Key';
    settingsBtn.className = 'text-xs hover-bg';
    settingsBtn.style.color = 'var(--text-muted)';
    settingsBtn.style.padding = '4px 8px';
    settingsBtn.style.borderRadius = 'var(--radius-sm)';

    settingsBtn.onclick = () => {
        if (confirm('¿Quieres cambiar/borrar tu API Key guardada?')) {
            localStorage.removeItem('openai_api_key');
            location.reload(); // Reload to trigger the main prompt
        }
    };

    header.appendChild(spacer);
    header.appendChild(settingsBtn);

    // Chat History
    const history = document.createElement('div');
    history.className = 'flex-col gap-md';
    history.style.flex = '1';
    history.style.overflowY = 'auto';
    history.style.padding = 'var(--spacing-md) 0';

    // Helper to add message
    const addMessage = (text, role) => {
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = `flex w-full ${role === 'user' ? 'justify-between' : ''}`;
        bubbleWrapper.style.justifyContent = role === 'user' ? 'flex-end' : 'flex-start';

        const bubble = document.createElement('div');
        bubble.style.padding = 'var(--spacing-md)';
        bubble.style.borderRadius = 'var(--radius-lg)';
        bubble.style.maxWidth = '70%';
        bubble.style.lineHeight = '1.6';
        bubble.style.fontSize = '0.95rem';

        if (role === 'user') {
            bubble.style.backgroundColor = 'var(--accent-primary)';
            bubble.style.color = 'var(--bg-app)';
            bubble.style.borderBottomRightRadius = '2px';
            bubble.style.fontWeight = '500';
        } else {
            bubble.style.backgroundColor = 'var(--bg-card)';
            bubble.style.color = 'var(--text-main)';
            bubble.style.border = '1px solid var(--border-light)';
            bubble.style.borderBottomLeftRadius = '2px';
        }

        bubble.innerText = text;
        bubbleWrapper.appendChild(bubble);
        history.appendChild(bubbleWrapper);
        history.scrollTop = history.scrollHeight;
    };

    // Initial Message
    addMessage('¡Hola! Soy NotionIA. ¿Cómo puedo ayudarte hoy?', 'ai');

    // Input Area
    const inputContainer = document.createElement('div');
    inputContainer.className = 'flex items-center gap-sm';
    inputContainer.style.backgroundColor = 'var(--bg-card)';
    inputContainer.style.padding = 'var(--spacing-sm)';
    inputContainer.style.borderRadius = 'var(--radius-lg)';
    inputContainer.style.border = '1px solid var(--border-light)';
    inputContainer.style.marginTop = 'var(--spacing-md)';

    const attachBtn = document.createElement('button');
    attachBtn.innerText = '📎';
    attachBtn.className = 'hover-bg';
    attachBtn.style.padding = '8px';
    attachBtn.style.borderRadius = 'var(--radius-sm)';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'chat-input';
    input.placeholder = 'Pregunta a NotionIA...';
    input.className = 'w-full';
    input.style.background = 'transparent';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.color = 'var(--text-main)';
    input.style.padding = '8px';
    input.style.fontSize = '1rem';

    const sendBtn = document.createElement('button');
    sendBtn.innerText = '➤';
    sendBtn.className = 'flex items-center justify-center';
    sendBtn.style.width = '36px';
    sendBtn.style.height = '36px';
    sendBtn.style.backgroundColor = 'var(--accent-primary)';
    sendBtn.style.borderRadius = '50%';
    sendBtn.style.color = 'var(--bg-app)';

    // Send Logic
    const handleSend = async () => {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        input.value = '';

        addMessage('Pensando...', 'ai');

        // Use localStorage
        const apiKey = localStorage.getItem('openai_api_key');
        // Simple check just in case, though main.js enforces it
        if (!apiKey) {
            addMessage('⚠️ Falta la API Key. Recarga la página para configurarla.', 'ai');
            history.removeChild(history.lastChild); // remove thinking
            return;
        }

        const response = await askAI(text, apiKey);

        // Remove "Thinking..." (Last child)
        history.removeChild(history.lastChild);

        addMessage(response, 'ai');
    };

    sendBtn.onclick = handleSend;
    input.onkeypress = (e) => { if (e.key === 'Enter') handleSend() };

    inputContainer.appendChild(attachBtn);
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendBtn);

    container.appendChild(header);
    container.appendChild(history);
    container.appendChild(inputContainer);

    return container;
}
