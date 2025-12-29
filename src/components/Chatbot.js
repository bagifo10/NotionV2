import { askAI } from '../services/ai.js';
import { addTask, addEvent, addProject, deleteProject, deleteTask, deleteEvent, getFullContext } from '../services/data.js';

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

    const clearBtn = document.createElement('button');
    clearBtn.innerText = '🗑️ Limpiar Chat';
    clearBtn.className = 'text-xs hover-bg';
    clearBtn.style.color = 'var(--text-muted)';
    clearBtn.style.padding = '4px 8px';
    clearBtn.style.borderRadius = 'var(--radius-sm)';
    clearBtn.style.marginRight = '8px';
    clearBtn.onclick = () => {
        if (confirm('¿Borrar historial de chat?')) {
            localStorage.removeItem('chat_history');
            history.innerHTML = '';
            addMessage('¡Hola! Soy NotionIA. ¿Cómo puedo ayudarte hoy?', 'ai');
        }
    };

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
    const btnGroup = document.createElement('div');
    btnGroup.appendChild(clearBtn);
    btnGroup.appendChild(settingsBtn);
    header.appendChild(btnGroup);

    // Chat History
    const history = document.createElement('div');
    history.className = 'flex-col gap-md';
    history.style.flex = '1';
    history.style.overflowY = 'auto';
    history.style.padding = 'var(--spacing-md) 0';

    // Helper to add message
    const addMessage = (text, role, save = true) => {
        const bubbleWrapper = document.createElement('div');
        bubbleWrapper.className = `flex w-full ${role === 'user' ? 'justify-between' : ''}`;
        bubbleWrapper.style.justifyContent = role === 'user' ? 'flex-end' : 'flex-start';

        const bubble = document.createElement('div');
        bubble.style.padding = 'var(--spacing-md)';
        bubble.style.borderRadius = 'var(--radius-lg)';
        bubble.style.maxWidth = '85%'; // Wider for better readability
        bubble.style.lineHeight = '1.6';
        bubble.style.fontSize = '0.95rem';

        if (role === 'user') {
            bubble.style.backgroundColor = 'var(--accent-primary)';
            bubble.style.color = 'var(--bg-app)';
            bubble.style.borderBottomRightRadius = '2px';
            bubble.style.fontWeight = '500';
            bubble.innerText = text;
        } else {
            bubble.style.backgroundColor = 'var(--bg-card)';
            bubble.style.color = 'var(--text-main)';
            bubble.style.border = '1px solid var(--border-light)';
            bubble.style.borderBottomLeftRadius = '2px';
            // Simple markdown parsing for code blocks/bold
            bubble.innerHTML = text
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                .replace(/```(.*?)```/gs, '<pre style="background:var(--bg-hover);padding:10px;border-radius:6px;overflow-x:auto;">$1</pre>');
        }

        bubbleWrapper.appendChild(bubble);
        history.appendChild(bubbleWrapper);
        history.scrollTop = history.scrollHeight;

        if (save) saveHistory();
    };

    const saveHistory = () => {
        const msgs = [];
        // This is a naive way to scrape history. Ideally use a state array.
        // For simplicity in Vanilla JS, we'll push to localStorage manually or skip scraping DOM.
        // Using a state array approach is better.
    };

    // State for storage
    let localHistory = JSON.parse(localStorage.getItem('chat_history')) || [];

    // Render existing
    if (localHistory.length > 0) {
        localHistory.forEach(msg => {
            // Don't save again when rendering from storage
            // Re-create DOM elements
            // We reuse addMessage logic but modify it slightly to not duplicate
            const bubbleWrapper = document.createElement('div');
            bubbleWrapper.className = `flex w-full ${msg.role === 'user' ? 'justify-between' : ''}`;
            bubbleWrapper.style.justifyContent = msg.role === 'user' ? 'flex-end' : 'flex-start';
            const bubble = document.createElement('div');
            bubble.style.padding = 'var(--spacing-md)';
            bubble.style.borderRadius = 'var(--radius-lg)';
            bubble.style.maxWidth = '85%';
            bubble.style.lineHeight = '1.6';
            bubble.style.fontSize = '0.95rem';
            if (msg.role === 'user') {
                bubble.style.backgroundColor = 'var(--accent-primary)';
                bubble.style.color = 'var(--bg-app)';
                bubble.innerText = msg.text;
            } else {
                bubble.style.backgroundColor = 'var(--bg-card)';
                bubble.style.color = 'var(--text-main)';
                bubble.style.border = '1px solid var(--border-light)';
                bubble.innerHTML = msg.text
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                    .replace(/```(.*?)```/gs, '<pre style="background:var(--bg-hover);padding:10px;border-radius:6px;overflow-x:auto;">$1</pre>');
            }
            bubbleWrapper.appendChild(bubble);
            history.appendChild(bubbleWrapper);
        });
        history.scrollTop = history.scrollHeight;
    } else {
        addMessage('¡Hola! Soy NotionIA. Puedo gestionar tus tareas y calendario. ¿Qué necesitas?', 'ai', false);
    }

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
    input.placeholder = 'Ej: Agendar reunión mañana a las 10am...';
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

        // UI Update
        addMessage(text, 'user', false);
        input.value = '';

        // Save to state
        localHistory.push({ role: 'user', text: text });
        localStorage.setItem('chat_history', JSON.stringify(localHistory));

        // Thinking placeholder
        const thinkingWrapper = document.createElement('div');
        thinkingWrapper.innerText = 'Pensando...';
        thinkingWrapper.className = 'text-muted text-sm';
        thinkingWrapper.style.padding = '10px';
        history.appendChild(thinkingWrapper);
        history.scrollTop = history.scrollHeight;

        const apiKey = localStorage.getItem('openai_api_key');
        if (!apiKey) {
            history.removeChild(thinkingWrapper);
            addMessage('⚠️ Falta la API Key. Recarga la página para configurarla.', 'ai', false);
            return;
        }

        // Get Context
        const context = JSON.stringify(getFullContext());

        // Call AI
        const response = await askAI(text, apiKey, context);

        history.removeChild(thinkingWrapper);

        // Parse Response for JSON actions
        let finalDisplayResponse = response;
        const actions = [];
        try {
            // Find possible JSON objects by looking for { and balancing braces
            let startIdx = response.indexOf('{');
            while (startIdx !== -1) {
                let braceCount = 0;
                let endIdx = -1;
                for (let i = startIdx; i < response.length; i++) {
                    if (response[i] === '{') braceCount++;
                    else if (response[i] === '}') braceCount--;
                    if (braceCount === 0) {
                        endIdx = i;
                        break;
                    }
                }
                if (endIdx !== -1) {
                    const jsonStr = response.substring(startIdx, endIdx + 1);
                    try {
                        const actionObj = JSON.parse(jsonStr);
                        if (actionObj.action) {
                            actions.push(actionObj);
                            // Remove JSON from displayed text
                            finalDisplayResponse = finalDisplayResponse.replace(jsonStr, '');
                        }
                    } catch (e) {
                        console.log('Detected block is not valid JSON:', jsonStr);
                    }
                    startIdx = response.indexOf('{', endIdx + 1);
                } else {
                    break;
                }
            }

            // Clean up empty lines or artifacts in text
            finalDisplayResponse = finalDisplayResponse.trim().replace(/\n{2,}/g, '\n');

            if (actions.length > 0) {
                for (const actionObj of actions) {
                    if (actionObj.action === 'create_task') {
                        addTask(actionObj.data);
                    } else if (actionObj.action === 'create_event') {
                        addEvent(actionObj.data);
                    } else if (actionObj.action === 'create_project') {
                        addProject(actionObj.data);
                    } else if (actionObj.action === 'edit_task') {
                        import('../services/data.js').then(m => m.updateTask(actionObj.data.id, actionObj.data));
                    } else if (actionObj.action === 'edit_event') {
                        import('../services/data.js').then(m => m.updateEvent(actionObj.data.id, actionObj.data));
                    } else if (actionObj.action === 'delete_project') {
                        const id = actionObj.data.id || (Array.isArray(actionObj.data.ids) ? actionObj.data.ids[0] : null);
                        if (id) deleteProject(id);
                    } else if (actionObj.action === 'delete_task') {
                        const id = actionObj.data.id || (Array.isArray(actionObj.data.ids) ? actionObj.data.ids[0] : null);
                        if (id) deleteTask(id);
                    } else if (actionObj.action === 'delete_event') {
                        const id = actionObj.data.id || (Array.isArray(actionObj.data.ids) ? actionObj.data.ids[0] : null);
                        if (id) deleteEvent(id);
                    }
                }
            }
        } catch (e) {
            console.log('Error processing AI actions:', e);
        }

        // If after cleaning JSON there's no text, provide a fallback
        if (!finalDisplayResponse && actions.length > 0) {
            finalDisplayResponse = `He procesado **${actions.length}** acciones correctamente.`;
        }

        addMessage(finalDisplayResponse, 'ai', false);
        localHistory.push({ role: 'ai', text: finalDisplayResponse });
        localStorage.setItem('chat_history', JSON.stringify(localHistory));
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
