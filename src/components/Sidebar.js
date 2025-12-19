export function Sidebar() {
    const aside = document.createElement('aside');
    aside.className = 'sidebar flex-col justify-between';
    aside.style.width = '260px';
    aside.style.backgroundColor = 'var(--bg-sidebar)';
    aside.style.borderRight = '1px solid var(--border-light)';
    aside.style.padding = 'var(--spacing-md)';
    aside.style.flexShrink = '0';

    // Logo Area
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo-container flex items-center gap-sm';
    logoDiv.style.marginBottom = 'var(--spacing-xl)';
    logoDiv.style.padding = '0 var(--spacing-xs)';

    const logoIcon = document.createElement('div');
    logoIcon.style.width = '24px';
    logoIcon.style.height = '24px';
    logoIcon.style.backgroundImage = 'var(--accent-gradient)';
    logoIcon.style.borderRadius = '6px';

    const logoText = document.createElement('h2');
    logoText.innerText = 'NotionIA';
    logoText.style.fontWeight = '600';
    logoText.style.fontSize = '1.1rem';

    logoDiv.appendChild(logoIcon);
    logoDiv.appendChild(logoText);

    // Navigation
    const nav = document.createElement('nav');
    nav.className = 'flex-col gap-sm';

    const links = [
        { name: 'Inicio', icon: '🏠', id: 'nav-dashboard' },
        { name: 'Chat IA', icon: '✨', id: 'nav-chat' },
        { name: 'Calendario', icon: '📅', id: 'nav-calendar' },
        { name: 'Proyectos', icon: '🚀', id: 'nav-projects' },
        { name: 'Tareas', icon: '✅', id: 'nav-tasks' },
    ];

    links.forEach(link => {
        const item = document.createElement('div');
        item.className = 'nav-item flex items-center gap-md hover-bg';
        item.style.padding = 'var(--spacing-sm) var(--spacing-md)';
        item.style.borderRadius = 'var(--radius-sm)';
        item.style.cursor = 'pointer';
        item.style.color = 'var(--text-muted)';
        item.dataset.target = link.id;

        // Simple Icon Placeholder
        const iconSpan = document.createElement('span');
        iconSpan.innerText = link.icon;
        iconSpan.style.fontSize = '1.1rem';

        const textSpan = document.createElement('span');
        textSpan.innerText = link.name;
        textSpan.style.fontSize = '0.95rem';
        textSpan.style.fontWeight = '500';

        item.appendChild(iconSpan);
        item.appendChild(textSpan);

        // Active State Logic (Simple Toggle for now)
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(el => {
                el.style.backgroundColor = 'transparent';
                el.style.color = 'var(--text-muted)';
            });
            item.style.backgroundColor = 'var(--bg-active)';
            item.style.color = 'var(--text-main)';

            // Dispatch custom event for routing
            window.dispatchEvent(new CustomEvent('navigate', { detail: link.id }));
        });

        nav.appendChild(item);
    });

    // User Profile (Bottom)
    const profile = document.createElement('div');
    profile.className = 'profile flex items-center gap-md hover-bg';
    profile.style.padding = 'var(--spacing-sm)';
    profile.style.marginTop = 'auto'; // Push to bottom
    profile.style.borderRadius = 'var(--radius-sm)';
    profile.style.cursor = 'pointer';

    const avatar = document.createElement('div');
    avatar.style.width = '32px';
    avatar.style.height = '32px';
    avatar.style.borderRadius = '50%';
    avatar.style.backgroundColor = '#333';
    avatar.style.backgroundImage = 'url("https://ui-avatars.com/api/?name=User&background=6c5ce7&color=fff")';
    avatar.style.backgroundSize = 'cover';

    const userText = document.createElement('div');
    userText.className = 'flex-col';
    userText.innerHTML = `
    <span style="font-size: 0.9rem; font-weight: 500;">Usuario</span>
    <span style="font-size: 0.75rem; color: var(--text-dim);">Plan Gratuito</span>
  `;

    profile.appendChild(avatar);
    profile.appendChild(userText);

    aside.appendChild(logoDiv);
    aside.appendChild(nav);
    aside.appendChild(profile);

    return aside;
}
