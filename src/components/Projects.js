export function Projects() {
    const container = document.createElement('div');
    container.className = 'flex-col w-full h-full gap-md';

    // Header
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between mb-4';

    const title = document.createElement('h2');
    title.innerText = 'Proyectos';
    title.style.fontWeight = '600';

    const newBtn = document.createElement('button');
    newBtn.innerText = '+ Nuevo Proyecto';
    newBtn.className = 'hover-bg';
    newBtn.style.padding = '8px 16px';
    newBtn.style.backgroundColor = 'var(--accent-primary)';
    newBtn.style.color = 'var(--bg-app)'; // Minimalist contrast
    newBtn.style.borderRadius = 'var(--radius-sm)';
    newBtn.style.fontWeight = '500';

    header.appendChild(title);
    header.appendChild(newBtn);

    // Projects Grid
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    grid.style.gap = 'var(--spacing-md)';

    const projects = [
        { title: 'Rediseño Web', status: 'En Progreso', progress: 65, color: '#ededed' },
        { title: 'App Móvil', status: 'Planificación', progress: 10, color: '#a0a0a0' },
        { title: 'Campaña Marketing', status: 'Revisión', progress: 85, color: '#ffffff' },
        { title: 'Roadmap Q4', status: 'Listo', progress: 100, color: '#666666' },
        { title: 'Herramientas Internas', status: 'En Progreso', progress: 40, color: '#cccccc' },
    ];

    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'hover-bg flex-col gap-sm';
        card.style.backgroundColor = 'var(--bg-card)';
        card.style.padding = 'var(--spacing-lg)';
        card.style.borderRadius = 'var(--radius-md)';
        card.style.border = '1px solid var(--border-light)';
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s';

        card.onmouseover = () => card.style.transform = 'translateY(-2px)';
        card.onmouseout = () => card.style.transform = 'translateY(0)';

        // Status Badge
        const badge = document.createElement('span');
        badge.innerText = p.status;
        badge.className = 'text-xs';
        badge.style.padding = '2px 8px';
        badge.style.backgroundColor = `${p.color}33`; // 20% opacity
        badge.style.color = p.color;
        badge.style.borderRadius = 'var(--radius-full)';
        badge.style.width = 'fit-content';

        // Title
        const cardTitle = document.createElement('h3');
        cardTitle.innerText = p.title;
        cardTitle.style.fontSize = '1.1rem';
        cardTitle.style.fontWeight = '500';

        // Progress Bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'w-full';
        progressContainer.style.height = '6px';
        progressContainer.style.backgroundColor = 'var(--bg-active)';
        progressContainer.style.borderRadius = 'var(--radius-full)';
        progressContainer.style.marginTop = 'auto';

        const progressBar = document.createElement('div');
        progressBar.style.width = `${p.progress}%`;
        progressBar.style.height = '100%';
        progressBar.style.backgroundColor = p.color;
        progressBar.style.borderRadius = 'var(--radius-full)';

        progressContainer.appendChild(progressBar);

        card.appendChild(badge);
        card.appendChild(cardTitle);
        card.appendChild(progressContainer);

        grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);

    return container;
}
