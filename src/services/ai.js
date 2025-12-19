export async function askAI(message, apiKey, systemContext = '') {
    if (!apiKey) {
        return "⚠️ Por favor ingresa tu API Key en la configuración.";
    }

    try {
        const messages = [
            {
                role: "system",
                content: `Eres NotionIA, un asistente inteligente integrado en una app de productividad.
                
                TUS PODERES (Responde con JSON para actuar):
                Si el usuario te pide crear/borrar algo, responde SOLO con un bloque JSON así:
                
                Para crear tarea:
                { "action": "create_task", "data": { "title": "...", "priority": "Alta/Media/Baja", "due": "..." } }
                
                Para crear evento:
                { "action": "create_event", "data": { "title": "...", "date": "YYYY-MM-DD" } }
                
                CONTEXTO ACTUAL:
                ${systemContext}
                
                Si no es una acción, responde normalmente en texto plano (Markdown soportado).
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
                model: "llama-3.3-70b-versatile", // Updated supported model
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
