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
