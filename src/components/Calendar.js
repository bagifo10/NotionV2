export function Calendar() {
    const container = document.createElement('div');
    container.className = 'flex-col w-full h-full gap-md';

    // Current Date Logic
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Header (Month/Week toggle + Controls)
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between';

    const title = document.createElement('h2');
    title.innerText = `${monthNames[currentMonth]} ${currentYear}`;
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
    grid.style.gridAutoRows = 'minmax(80px, 1fr)';
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
        el.style.padding = '8px';
        el.style.fontWeight = '500';
        grid.appendChild(el);
    });

    // Days Grid Logic (Dynamic)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.style.backgroundColor = 'var(--bg-card)';
        grid.appendChild(empty);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('div');
        cell.style.backgroundColor = 'var(--bg-card)';
        cell.style.padding = '6px';
        cell.style.display = 'flex';
        cell.style.flexDirection = 'column';
        cell.style.gap = '4px';
        cell.className = 'hover-bg';

        const dateNum = document.createElement('span');
        dateNum.className = 'text-xs text-muted';
        dateNum.innerText = i;

        // Highlight today
        if (i === now.getDate()) {
            dateNum.style.backgroundColor = 'var(--accent-primary)';
            dateNum.style.color = 'var(--bg-app)';
            dateNum.style.width = '20px';
            dateNum.style.height = '20px';
            dateNum.style.borderRadius = '50%';
            dateNum.style.display = 'flex';
            dateNum.style.alignItems = 'center';
            dateNum.style.justifyContent = 'center';
        }

        cell.appendChild(dateNum);

        // Random Mock Events
        if (Math.random() > 0.85) {
            const event = document.createElement('div');
            event.className = 'text-xs';
            event.style.padding = '2px 6px';
            event.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            event.style.color = '#ededed';
            event.style.borderRadius = '2px';
            event.innerText = 'Reunión';
            cell.appendChild(event);
        }

        grid.appendChild(cell);
    }

    // Fill remaining cells to make the grid look square (optional-ish)
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;

    // Ensure at least 5 rows visually often looks better, but simple filling reference is fine
    for (let i = 0; i < remaining; i++) {
        const empty = document.createElement('div');
        empty.style.backgroundColor = 'var(--bg-card)';
        grid.appendChild(empty);
    }

    container.appendChild(header);
    container.appendChild(grid);

    return container;
}
