import { getTasks, addTask, deleteTask, saveTasks } from '../services/data.js';

export function Tasks() {
    const container = document.createElement('div');
    container.className = 'flex-col w-full h-full gap-md';

    // Header
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between mb-4';

    const title = document.createElement('h2');
    title.innerText = 'Todas las Tareas';
    title.style.fontWeight = '600';

    const actions = document.createElement('div');
    actions.className = 'flex items-center gap-sm';

    const newBtn = document.createElement('button');
    newBtn.innerText = 'Nueva Tarea';
    newBtn.className = 'hover-bg';
    newBtn.style.padding = '6px 12px';
    newBtn.style.backgroundColor = 'var(--accent-secondary)';
    newBtn.style.color = '#000';
    newBtn.style.fontWeight = '500';
    newBtn.style.borderRadius = 'var(--radius-sm)';

    newBtn.onclick = () => {
        const title = prompt('Nombre de la tarea:');
        if (!title) return;
        const priority = prompt('Prioridad (Alta, Media, Baja):', 'Media');
        const due = prompt('Fecha límite (Ej: Hoy, Mañana):', 'Hoy');

        addTask({ title, priority, due: due || 'Hoy', done: false });
        renderList(); // Refresh
    };

    actions.appendChild(newBtn);
    header.appendChild(title);
    header.appendChild(actions);

    // Task List Container
    const list = document.createElement('div');
    list.className = 'flex-col gap-1';

    // Render Function
    const renderList = () => {
        list.innerHTML = '';
        const tasks = getTasks();

        // Header Row
        const listHeader = document.createElement('div');
        listHeader.className = 'flex items-center text-muted text-xs uppercase';
        listHeader.style.padding = '8px 12px';
        listHeader.style.borderBottom = '1px solid var(--border-light)';
        listHeader.innerHTML = `
        <div style="flex: 1;">Nombre Tarea</div>
        <div style="width: 120px;">Prioridad</div>
        <div style="width: 120px;">Fecha</div>
        <div style="width: 40px;"></div>
      `;
        list.appendChild(listHeader);

        if (tasks.length === 0) {
            list.innerHTML += `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No hay tareas pendientes.</div>`;
            return;
        }

        tasks.forEach(t => {
            const row = document.createElement('div');
            row.className = 'flex items-center hover-bg';
            row.style.padding = '12px 12px';
            row.style.borderBottom = '1px solid var(--border-light)';

            // Allow checking "done" visually (though simplest is just data sync)
            if (t.done) row.style.opacity = '0.5';

            // Checkbox + Title
            const titleCol = document.createElement('div');
            titleCol.className = 'flex items-center gap-md';
            titleCol.style.flex = '1';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = t.done || false;
            checkbox.style.accentColor = 'var(--accent-primary)';
            checkbox.onclick = (e) => {
                // e.stopPropagation();
                t.done = checkbox.checked;
                saveTasks(tasks); // Save state
                renderList();
            };

            const text = document.createElement('span');
            text.innerText = t.title;
            text.style.fontSize = '0.95rem';
            text.style.cursor = 'pointer';
            if (t.done) text.style.textDecoration = 'line-through';

            text.onclick = () => {
                const newTitle = prompt('Nuevo título de la tarea:', t.title);
                if (newTitle && newTitle !== t.title) {
                    import('../services/data.js').then(m => m.updateTask(t.id, { title: newTitle }));
                    renderList();
                }
            };

            titleCol.appendChild(checkbox);
            titleCol.appendChild(text);

            // Priority
            const priorityCol = document.createElement('div');
            priorityCol.style.width = '120px';

            const badge = document.createElement('span');
            badge.innerText = t.priority;
            badge.className = 'text-xs';
            badge.style.padding = '2px 8px';
            badge.style.borderRadius = 'var(--radius-full)';
            badge.style.cursor = 'pointer';

            badge.onclick = () => {
                const newP = prompt('Prioridad (Alta, Media, Baja):', t.priority);
                if (newP) {
                    import('../services/data.js').then(m => m.updateTask(t.id, { priority: newP }));
                    renderList();
                }
            };

            // Basic Color Logic
            const p = (t.priority || '').toLowerCase();
            if (p.includes('alt') || p.includes('crít')) {
                badge.style.backgroundColor = 'rgba(255, 118, 117, 0.2)';
                badge.style.color = '#ff7675';
            } else if (p.includes('med')) {
                badge.style.backgroundColor = 'rgba(253, 203, 110, 0.2)';
                badge.style.color = '#fdcb6e';
            } else {
                badge.style.backgroundColor = 'rgba(160, 160, 165, 0.2)';
                badge.style.color = '#a0a0a5';
            }

            priorityCol.appendChild(badge);

            // Due Date
            const dueCol = document.createElement('div');
            dueCol.style.width = '120px';
            dueCol.className = 'text-sm text-dim';
            dueCol.style.cursor = 'pointer';
            dueCol.innerText = t.due;

            dueCol.onclick = () => {
                const newDue = prompt('Fecha límite (Ej: Hoy, Mañana, YYYY-MM-DD):', t.due);
                if (newDue) {
                    import('../services/data.js').then(m => m.updateTask(t.id, { due: newDue }));
                    renderList();
                }
            };

            // Delete Action
            const actionCol = document.createElement('div');
            actionCol.style.width = '40px';

            const delBtn = document.createElement('button');
            delBtn.innerText = '🗑️';
            delBtn.style.opacity = '0.5';
            delBtn.className = 'hover-bg';
            delBtn.style.padding = '4px';
            delBtn.style.borderRadius = '4px';

            delBtn.onclick = () => {
                if (confirm('¿Eliminar tarea?')) {
                    deleteTask(t.id);
                    renderList();
                }
            };

            actionCol.appendChild(delBtn);

            row.appendChild(titleCol);
            row.appendChild(priorityCol);
            row.appendChild(dueCol);
            row.appendChild(actionCol);

            list.appendChild(row);
        });
    };

    renderList(); // Initial render

    // Listen for external updates (e.g. from AI)
    window.addEventListener('data-change-tasks', renderList);

    container.appendChild(header);
    container.appendChild(list);

    return container;
}
