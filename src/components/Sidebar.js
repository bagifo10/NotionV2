export function Sidebar() {
    const aside = document.createElement('aside');
    aside.className = 'sidebar flex-col justify-between';
    aside.style.width = '240px'; // Slightly narrower
    aside.style.backgroundColor = 'var(--bg-sidebar)';
    aside.style.borderRight = '1px solid var(--border-light)';
    aside.style.padding = 'var(--spacing-md)';
    aside.style.flexShrink = '0';
    aside.style.transition = 'background-color 0.3s ease';

    // Logo Area
    const logoDiv = document.createElement('div');
    logoDiv.className = 'logo-container flex items-center gap-sm';
    logoDiv.style.marginBottom = 'var(--spacing-xl)';
    logoDiv.style.padding = '0 var(--spacing-xs)';

    const logoIcon = document.createElement('div');
    logoIcon.style.width = '20px';
    logoIcon.style.height = '20px';
    logoIcon.style.backgroundImage = 'var(--accent-gradient)';
    logoIcon.style.borderRadius = '4px';

    const logoText = document.createElement('h2');
    logoText.innerText = 'NotionIA';
    logoText.style.fontWeight = '600';
    logoText.style.fontSize = '1rem';
    logoText.style.color = 'var(--text-main)';

    logoDiv.appendChild(logoIcon);
    logoDiv.appendChild(logoText);

    // Navigation
    const nav = document.createElement('nav');
    nav.className = 'flex-col gap-1'; // Tighter gap

    const links = [
        // { name: 'Inicio', icon: '🏠', id: 'nav-dashboard' }, // REMOVED
        { name: 'Chat AI', icon: '✨', id: 'nav-chat' },
        { name: 'Calendario', icon: '📅', id: 'nav-calendar' },
        { name: 'Proyectos', icon: '🚀', id: 'nav-projects' },
        { name: 'Tareas', icon: '✅', id: 'nav-tasks' },
    ];

    links.forEach(link => {
        const item = document.createElement('div');
        item.className = 'nav-item flex items-center gap-md hover-bg';
        item.style.padding = '6px 12px';
        item.style.borderRadius = 'var(--radius-sm)';
        item.style.cursor = 'pointer';
        item.style.color = 'var(--text-muted)';
        item.dataset.target = link.id;
        item.style.transition = 'all 0.2s';

        // Simple Icon Placeholder
        const iconSpan = document.createElement('span');
        iconSpan.innerText = link.icon;
        iconSpan.style.fontSize = '1.1rem';

        const textSpan = document.createElement('span');
        textSpan.innerText = link.name;
        textSpan.style.fontSize = '0.9rem';
        textSpan.style.fontWeight = '500';

        item.appendChild(iconSpan);
        item.appendChild(textSpan);

        // Active State Logic
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

    // Bottom Section (Theme Toggle + Profile)
    const bottomSection = document.createElement('div');
    bottomSection.className = 'flex-col gap-sm';
    bottomSection.style.marginTop = 'auto';

    // Theme Toggle
    const themeToggle = document.createElement('button');
    themeToggle.className = 'hover-bg flex items-center gap-md w-full';
    themeToggle.style.padding = '6px 12px';
    themeToggle.style.borderRadius = 'var(--radius-sm)';
    themeToggle.style.color = 'var(--text-muted)';
    themeToggle.style.fontSize = '0.9rem';
    themeToggle.style.fontWeight = '500';

    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme');

    // Default is now Light (no class). 'dark' adds class.
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<span>☀️</span> <span>Modo Claro</span>';
    } else {
        // Default Light
        themeToggle.innerHTML = '<span>🌙</span> <span>Modo Oscuro</span>';
    }

    themeToggle.onclick = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<span>☀️</span> <span>Modo Claro</span>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<span>🌙</span> <span>Modo Oscuro</span>';
        }
    };

    // User Profile
    const profile = document.createElement('div');
    profile.className = 'profile flex items-center gap-md hover-bg';
    profile.style.padding = '6px 2px';
    profile.style.borderRadius = 'var(--radius-sm)';
    profile.style.cursor = 'pointer';

    const avatar = document.createElement('div');
    avatar.style.width = '24px';
    avatar.style.height = '24px';
    avatar.style.borderRadius = '50%';
    avatar.style.backgroundColor = '#333';
    avatar.style.backgroundImage = 'url("https://ui-avatars.com/api/?name=User&background=6c5ce7&color=fff")';
    avatar.style.backgroundSize = 'cover';

    const userText = document.createElement('span');
    userText.style.fontSize = '0.9rem';
    userText.style.fontWeight = '500';
    userText.style.color = 'var(--text-main)';
    userText.innerText = 'Usuario';

    profile.appendChild(avatar);
    profile.appendChild(userText);

    bottomSection.appendChild(themeToggle);
    bottomSection.appendChild(profile);

    aside.appendChild(logoDiv);
    aside.appendChild(nav);
    aside.appendChild(bottomSection);

    return aside;
}
