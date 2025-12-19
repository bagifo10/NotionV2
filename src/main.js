import './style.css'
import { Layout } from './components/Layout.js'

// Initial Render
const app = document.getElementById('app');
app.innerHTML = '';
app.appendChild(Layout());

// API Key Management (Global Prompt)
function checkApiKey() {
  const storedKey = localStorage.getItem('openai_api_key');
  if (!storedKey) {
    showApiKeyModal();
  }
}

function showApiKeyModal() {
  // Create Overlay
  const overlay = document.createElement('div');
  overlay.id = 'api-key-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.backdropFilter = 'blur(5px)';

  // Card
  const card = document.createElement('div');
  card.style.backgroundColor = 'var(--bg-card)';
  card.style.padding = '2rem';
  card.style.borderRadius = 'var(--radius-lg)';
  card.style.border = '1px solid var(--border-light)';
  card.style.boxShadow = 'var(--shadow-lg)';
  card.style.maxWidth = '400px';
  card.style.width = '90%';
  card.style.textAlign = 'center';
  card.style.color = 'var(--text-main)';

  const icon = document.createElement('div');
  icon.innerText = '🔑';
  icon.style.fontSize = '3rem';
  icon.style.marginBottom = '1rem';

  const title = document.createElement('h2');
  title.innerText = 'Configuración Requerida';
  title.style.marginBottom = '0.5rem';
  title.style.fontSize = '1.25rem';

  const desc = document.createElement('p');
  desc.innerText = 'Para usar NotionIA, necesitas conectar tu propia API Key de Groq. Se guardará localmente en tu navegador.';
  desc.style.color = 'var(--text-muted)';
  desc.style.marginBottom = '1.5rem';
  desc.style.fontSize = '0.9rem';
  desc.style.lineHeight = '1.5';

  const input = document.createElement('input');
  input.type = 'password';
  input.placeholder = 'sk-...';
  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.marginBottom = '1rem';
  input.style.borderRadius = 'var(--radius-sm)';
  input.style.border = '1px solid var(--border-light)';
  input.style.backgroundColor = 'var(--bg-app)';
  input.style.color = 'var(--text-main)';
  input.style.outline = 'none';

  const btn = document.createElement('button');
  btn.innerText = 'Guardar y Continuar';
  btn.style.width = '100%';
  btn.style.padding = '10px';
  btn.style.backgroundColor = 'var(--accent-primary)';
  btn.style.color = 'var(--bg-app)';
  btn.style.border = 'none';
  btn.style.borderRadius = 'var(--radius-sm)';
  btn.style.cursor = 'pointer';
  btn.style.fontWeight = '600';

  // Error msg
  const errorMsg = document.createElement('p');
  errorMsg.style.color = '#ff4d4d';
  errorMsg.style.fontSize = '0.8rem';
  errorMsg.style.marginTop = '0.5rem';
  errorMsg.style.display = 'none';

  btn.onclick = () => {
    const key = input.value.trim();
    if ((key.startsWith('sk-') || key.startsWith('gsk_')) && key.length > 20) {
      localStorage.setItem('openai_api_key', key);
      document.body.removeChild(overlay);
    } else {
      errorMsg.innerText = 'Por favor ingresa una API Key válida (empieza con gsk_ o sk-).';
      errorMsg.style.display = 'block';
    }
  };

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(input);
  card.appendChild(btn);
  card.appendChild(errorMsg);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

// Check on load
checkApiKey();

// Routing Logic
const contentContainer = document.getElementById('page-content');
const pageTitle = document.getElementById('page-title');

function renderPage(pageId) {
  // Clear current content
  contentContainer.innerHTML = '';

  // Update Title
  const titles = {
    // 'nav-dashboard': 'Inicio', // REMOVED
    'nav-chat': 'Chat IA',
    'nav-calendar': 'Calendario',
    'nav-projects': 'Proyectos',
    'nav-tasks': 'Tareas'
  };
  if (pageTitle) pageTitle.innerText = titles[pageId] || 'NotionIA';

  // Render Module based on ID
  switch (pageId) {
    case 'nav-chat':
      import('./components/Chatbot.js').then(module => {
        contentContainer.appendChild(module.Chatbot());
      });
      break;
    case 'nav-calendar':
      import('./components/Calendar.js').then(module => {
        contentContainer.appendChild(module.Calendar());
      });
      break;
    case 'nav-projects':
      import('./components/Projects.js').then(module => {
        contentContainer.appendChild(module.Projects());
      });
      break;
    case 'nav-tasks':
      import('./components/Tasks.js').then(module => {
        contentContainer.appendChild(module.Tasks());
      });
      break;
    default:
      // Fallback to chat
      import('./components/Chatbot.js').then(module => {
        contentContainer.appendChild(module.Chatbot());
      });
  }
}

// Listen for navigation events
window.addEventListener('navigate', (e) => {
  renderPage(e.detail);
});

// Default Route
renderPage('nav-chat');
