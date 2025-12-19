export async function askAI(message, apiKey) {
    if (!apiKey) {
        return "⚠️ Por favor ingresa tu API Key en la configuración.";
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return `Error: ${data.error.message}`;
        }

        return data.choices[0].message.content;

    } catch (error) {
        return "Error de conexión con la IA.";
    }
}
