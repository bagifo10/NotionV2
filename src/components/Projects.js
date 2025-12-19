import { getProjects, addProject, deleteProject, saveProjects } from '../services/data.js';

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
    newBtn.style.color = 'var(--bg-app)';
    newBtn.style.borderRadius = 'var(--radius-sm)';
    newBtn.style.fontWeight = '500';

    newBtn.onclick = () => {
        const title = prompt('Nombre del Proyecto:');
        if (!title) return;

        addProject({
            title,
            status: 'Planificación',
            progress: 0,
            color: '#a68a64' // Default accent
        });
        renderGrid();
    };

    header.appendChild(title);
    header.appendChild(newBtn);

    // Projects Grid
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
    grid.style.gap = 'var(--spacing-md)';

    const renderGrid = () => {
        grid.innerHTML = '';
        const projects = getProjects();

        if (projects.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No hay proyectos activos.</div>`;
            return;
        }

        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'hover-bg flex-col gap-sm';
            card.style.backgroundColor = 'var(--bg-card)';
            card.style.padding = 'var(--spacing-lg)';
            card.style.borderRadius = 'var(--radius-md)';
            card.style.border = '1px solid var(--border-light)';
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.2s';
            card.style.position = 'relative';

            card.onmouseover = () => card.style.transform = 'translateY(-2px)';
            card.onmouseout = () => card.style.transform = 'translateY(0)';

            // Delete Btn (Top Right)
            const delBtn = document.createElement('button');
            delBtn.innerText = '🗑️';
            delBtn.style.position = 'absolute';
            delBtn.style.top = '10px';
            delBtn.style.right = '10px';
            delBtn.style.opacity = '0.3';
            delBtn.style.fontSize = '0.8rem';
            delBtn.onmouseenter = () => delBtn.style.opacity = '1';
            delBtn.onmouseleave = () => delBtn.style.opacity = '0.3';

            delBtn.onclick = (e) => {
                e.stopPropagation();
                if (confirm(`¿Eliminar proyecto "${p.title}"?`)) {
                    deleteProject(p.id);
                    renderGrid();
                }
            };
            card.appendChild(delBtn);

            // Status Badge
            const badge = document.createElement('span');
            badge.innerText = p.status;
            badge.className = 'text-xs';
            badge.style.padding = '2px 8px';
            badge.style.backgroundColor = `${p.color}33`; // 20% opacity
            badge.style.color = p.color;
            badge.style.borderRadius = 'var(--radius-full)';
            badge.style.width = 'fit-content';

            // Allow changing status on click
            badge.onclick = (e) => {
                e.stopPropagation();
                const newStatus = prompt('Nuevo estado (En Progreso, Listo, Planificación):', p.status);
                if (newStatus) {
                    p.status = newStatus;
                    saveProjects(projects);
                    renderGrid();
                }
            };

            // Title
            const cardTitle = document.createElement('h3');
            cardTitle.innerText = p.title;
            cardTitle.style.fontSize = '1.1rem';
            cardTitle.style.fontWeight = '500';

            // Progress Bar
            const progressContainer = document.createElement('div');
            progressContainer.className = 'w-full';
            progressContainer.style.height = '8px';
            progressContainer.style.backgroundColor = 'var(--bg-active)';
            progressContainer.style.borderRadius = 'var(--radius-full)';
            progressContainer.style.marginTop = 'auto';
            progressContainer.style.cursor = 'e-resize';
            progressContainer.title = 'Clic para cambiar progreso';

            const progressBar = document.createElement('div');
            progressBar.style.width = `${p.progress}%`;
            progressBar.style.height = '100%';
            progressBar.style.backgroundColor = p.color;
            progressBar.style.borderRadius = 'var(--radius-full)';
            progressBar.style.transition = 'width 0.3s ease';

            progressContainer.appendChild(progressBar);

            // Interaction to change progress
            progressContainer.onclick = (e) => {
                e.stopPropagation();
                const rect = progressContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const width = rect.width;
                const percent = Math.round((x / width) * 100);

                p.progress = Math.max(0, Math.min(100, percent));
                saveProjects(projects);
                progressBar.style.width = `${p.progress}%`;
            };

            card.appendChild(badge);
            card.appendChild(cardTitle);
            card.appendChild(progressContainer);

            grid.appendChild(card);
        });
    };

    renderGrid();
    window.addEventListener('data-change-projects', renderGrid);

    container.appendChild(header);
    container.appendChild(grid);

    return container;
}
