export async function askAI(message, apiKey, systemContext = '') {
    if (!apiKey) {
        return "⚠️ Por favor ingresa tu API Key en la configuración.";
    }

    try {
        const messages = [
            {
                role: "system",
                content: `Eres NotionIA, un asistente inteligente integrado en una app de productividad.
                
                TUS PODERES (IMPORTANTE: JSON OBLIGATORIO PARA ACCIONES):
                Si el usuario quiere crear o borrar algo, RESPONDE CON UNO O MÁS BLOQUES JSON.
                
                Acciones de Creación:
                - Crear tarea: { "action": "create_task", "data": { "title": "...", "priority": "Alta/Media/Baja", "due": "..." } }
                - Crear evento: { "action": "create_event", "data": { "title": "...", "date": "YYYY-MM-DD" } }
                - Crear proyecto: { "action": "create_project", "data": { "title": "...", "status": "Planificación", "progress": 0, "color": "#a68a64" } }
                
                Acciones de Eliminación (Usa los IDs del contexto):
                - Borrar tarea: { "action": "delete_task", "data": { "id": 123 } }
                - Borrar evento: { "action": "delete_event", "data": { "id": 123 } }
                - Borrar proyecto: { "action": "delete_project", "data": { "id": 123 } }
                
                CONTEXTO ACTUAL:
                ${systemContext}
                
                REGLA DE ORO: Si generas JSON, NO añadas texto antes ni después. Solo el/los bloques JSON.
                `
            },
            { role: "user", content: message }
        ];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Using 70b as it is robust, user asked for supported model.
                // If this fails, we can try llama-3.1-8b-instant. 
                // Wait, user explicitly asked for "llama3-8b-instant o equivalente".
                // I will use llama-3.1-70b-versatile or llama-3.1-8b-instant.
                // Let's go with llama-3.1-70b-versatile for better intelligence if allowed,
                // but to be safe and fast as requested "instant":
                model: "llama-3.1-8b-instant",
                messages: messages,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (data.error) {
            return `Error Groq: ${data.error.message}`;
        }

        return data.choices[0].message.content;

    } catch (error) {
        return "Error de conexión con la IA.";
    }
}
