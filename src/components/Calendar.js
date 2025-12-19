export function Calendar() {
    const container = document.createElement('div');
    container.className = 'flex-col w-full h-full gap-md';

    // Header (Month/Week toggle + Controls)
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between';

    const title = document.createElement('h2');
    title.innerText = 'Diciembre 2025';
    title.style.fontWeight = '600';

    const controls = document.createElement('div');
    controls.className = 'flex items-center gap-sm bg-card p-1 rounded';
    controls.style.backgroundColor = 'var(--bg-card)';
    controls.style.padding = '4px';
    controls.style.borderRadius = 'var(--radius-md)';

    ['Mes', 'Semana'].forEach((view, index) => {
        const btn = document.createElement('button');
        btn.innerText = view;
        btn.style.padding = '6px 12px';
        btn.style.borderRadius = 'var(--radius-sm)';
        btn.style.fontSize = '0.9rem';

        if (index === 0) { // Active
            btn.style.backgroundColor = 'var(--bg-active)';
            btn.style.color = 'var(--text-main)';
        } else {
            btn.style.color = 'var(--text-muted)';
        }

        controls.appendChild(btn);
    });

    header.appendChild(title);
    header.appendChild(controls);

    // Grid Container
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    // Reduced row height for more compact/minimalist look
    grid.style.gridAutoRows = 'minmax(80px, 1fr)'; // Was 120px
    grid.style.gap = '1px';
    grid.style.backgroundColor = 'var(--border-light)'; // Lines
    grid.style.border = '1px solid var(--border-light)';
    grid.style.borderRadius = 'var(--radius-md)';
    grid.style.overflow = 'hidden';

    // Days Header
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    days.forEach(day => {
        const el = document.createElement('div');
        el.innerText = day;
        el.className = 'flex justify-center items-center text-muted text-xs';
        el.style.backgroundColor = 'var(--bg-app)';
        el.style.padding = '8px'; // Reduced padding
        el.style.fontWeight = '500';
        grid.appendChild(el);
    });

    // Days Grid Logic (Full Month - Dec 2025 starts on Monday)
    // 1st is Monday (index 1). So 1 empty cell.
    // December has 31 days.

    // Empty cells for Sunday (Dec 1st is Monday)
    if (true) { // Logic for Dec 2025
        const empty = document.createElement('div');
        empty.style.backgroundColor = 'var(--bg-card)';
        grid.appendChild(empty);
    }

    for (let i = 1; i <= 31; i++) {
        const cell = document.createElement('div');
        cell.style.backgroundColor = 'var(--bg-card)';
        cell.style.padding = '6px'; // Reduced padding
        cell.style.display = 'flex';
        cell.style.flexDirection = 'column';
        cell.style.gap = '4px';
        cell.className = 'hover-bg';

        const dateNum = document.createElement('span');
        dateNum.className = 'text-xs text-muted';
        dateNum.innerText = i;

        cell.appendChild(dateNum);

        // Random Mock Events
        if (Math.random() > 0.85) {
            const event = document.createElement('div');
            event.className = 'text-xs';
            event.style.padding = '2px 6px';
            event.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // More minimal
            event.style.color = '#ededed';
            event.style.borderRadius = '2px'; // Sharper
            event.innerText = 'Reunión';
            cell.appendChild(event);
        }

        grid.appendChild(cell);
    }

    // Fill remaining cells to make the grid look square (optional-ish)
    // Total cells so far = 1 + 31 = 32. 
    // Next multiple of 7 is 35. 3 empty cells at end.
    for (let i = 0; i < 3; i++) {
        const empty = document.createElement('div');
        empty.style.backgroundColor = 'var(--bg-card)';
        grid.appendChild(empty);
    }

    container.appendChild(header);
    container.appendChild(grid);

    return container;
}
