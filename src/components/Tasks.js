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

    const filterBtn = document.createElement('button');
    filterBtn.innerText = 'Filtrar';
    filterBtn.className = 'hover-bg text-sm text-muted';
    filterBtn.style.padding = '6px 10px';
    filterBtn.style.borderRadius = 'var(--radius-sm)';

    const sortBtn = document.createElement('button');
    sortBtn.innerText = 'Ordenar';
    sortBtn.className = 'hover-bg text-sm text-muted';
    sortBtn.style.padding = '6px 10px';
    sortBtn.style.borderRadius = 'var(--radius-sm)';

    const newBtn = document.createElement('button');
    newBtn.innerText = 'Nueva Tarea';
    newBtn.className = 'hover-bg';
    newBtn.style.padding = '6px 12px';
    newBtn.style.backgroundColor = 'var(--accent-secondary)';
    newBtn.style.color = '#000';
    newBtn.style.fontWeight = '500';
    newBtn.style.borderRadius = 'var(--radius-sm)';

    actions.appendChild(filterBtn);
    actions.appendChild(sortBtn);
    actions.appendChild(newBtn);

    header.appendChild(title);
    header.appendChild(actions);

    // Task List
    const list = document.createElement('div');
    list.className = 'flex-col gap-1';

    const tasks = [
        { title: 'Investigar Modelos IA', priority: 'Alta', due: 'Hoy' },
        { title: 'Borrador Sistema Diseño', priority: 'Media', due: 'Mañana' },
        { title: 'Actualizar Dependencias', priority: 'Baja', due: 'Próxima Semana' },
        { title: 'Preparar Reunión Cliente', priority: 'Alta', due: 'Hoy' },
        { title: 'Arreglar Bug de Navegación', priority: 'Crítica', due: 'ASAP' },
    ];

    // Header Row
    const listHeader = document.createElement('div');
    listHeader.className = 'flex items-center text-muted text-xs uppercase';
    listHeader.style.padding = '8px 12px';
    listHeader.style.borderBottom = '1px solid var(--border-light)';
    listHeader.innerHTML = `
    <div style="flex: 1;">Nombre Tarea</div>
    <div style="width: 120px;">Prioridad</div>
    <div style="width: 120px;">Fecha</div>
  `;
    list.appendChild(listHeader);

    tasks.forEach(t => {
        const row = document.createElement('div');
        row.className = 'flex items-center hover-bg';
        row.style.padding = '12px 12px';
        row.style.borderBottom = '1px solid var(--border-light)';
        row.style.cursor = 'pointer';

        // Checkbox + Title
        const titleCol = document.createElement('div');
        titleCol.className = 'flex items-center gap-md';
        titleCol.style.flex = '1';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.style.accentColor = 'var(--accent-primary)';

        const text = document.createElement('span');
        text.innerText = t.title;
        text.style.fontSize = '0.95rem';

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

        // Color logic
        if (t.priority === 'Alta' || t.priority === 'Crítica') {
            badge.style.backgroundColor = 'rgba(255, 118, 117, 0.2)';
            badge.style.color = '#ff7675';
        } else if (t.priority === 'Media') {
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
        dueCol.innerText = t.due;

        row.appendChild(titleCol);
        row.appendChild(priorityCol);
        row.appendChild(dueCol);

        list.appendChild(row);
    });

    container.appendChild(header);
    container.appendChild(list);

    return container;
}
