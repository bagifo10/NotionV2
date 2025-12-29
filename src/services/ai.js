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
                Si el usuario quiere crear, borrar o editar algo, RESPONDE CON UNO O MÁS BLOQUES JSON.
                Puedes añadir texto conversacional ANTES o DESPUÉS de los bloques JSON para ser más amable.
                
                Acciones de Creación:
                - Crear tarea: { "action": "create_task", "data": { "title": "...", "priority": "Alta/Media/Baja", "due": "..." } }
                - Crear evento: { "action": "create_event", "data": { "title": "...", "date": "YYYY-MM-DD" } }
                - Crear proyecto: { "action": "create_project", "data": { "title": "...", "status": "Planificación", "progress": 0, "color": "#a68a64" } }
                
                Acciones de Edición (Usa los IDs del contexto):
                - Editar tarea: { "action": "edit_task", "data": { "id": 123, "title": "...", "priority": "...", "due": "...", "done": true/false } }
                - Editar evento: { "action": "edit_event", "data": { "id": 123, "title": "...", "date": "YYYY-MM-DD" } }
                
                Acciones de Eliminación:
                - Borrar tarea: { "action": "delete_task", "data": { "id": 123 } }
                - Borrar evento: { "action": "delete_event", "data": { "id": 123 } }
                - Borrar proyecto: { "action": "delete_project", "data": { "id": 123 } }
                
                REGLAS CRÍTICAS:
                1. Si el usuario pide varias cosas (ej: "agregá esto y aquello"), GENERA TODOS los bloques JSON necesarios en la misma respuesta.
                2. Sé conversacional. No digas solo "Hecho". Di algo como "¡Claro! Ya agendé tu viaje. ¿Querés que también te ponga un recordatorio para armar las valijas?" o similar.
                3. Usa el contexto para saber qué IDs editar o borrar.
                4. IMPORTANTE: Los bloques JSON deben ser válidos y estar separados si son varios.
                
                CONTEXTO ACTUAL:
                ${systemContext}
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
