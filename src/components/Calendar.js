import { getEvents, addEvent } from '../services/data.js';

export function Calendar() {
    const container = document.createElement('div');
    container.className = 'flex-col w-full h-full gap-md';

    // State
    let currentDate = new Date();
    let currentView = 'month'; // 'month' or 'week'

    const render = () => {
        container.innerHTML = '';

        // --- Controls logic ---
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        // Header
        const header = document.createElement('div');
        header.className = 'flex items-center justify-between';

        const titleGroup = document.createElement('div');
        titleGroup.className = 'flex items-center gap-md';

        const title = document.createElement('h2');
        title.innerText = `${monthNames[month]} ${year}`;
        title.style.fontWeight = '600';

        // Nav Arrows
        const arrows = document.createElement('div');
        arrows.className = 'flex gap-sm';

        const prevBtn = document.createElement('button');
        prevBtn.innerText = '‹';
        prevBtn.style.fontSize = '1.2rem';
        prevBtn.className = 'hover-bg w-8 h-8 rounded flex items-center justify-center';
        prevBtn.onclick = () => {
            if (currentView === 'month') {
                currentDate.setMonth(currentDate.getMonth() - 1);
            } else {
                currentDate.setDate(currentDate.getDate() - 7);
            }
            render();
        };

        const nextBtn = document.createElement('button');
        nextBtn.innerText = '›';
        nextBtn.style.fontSize = '1.2rem';
        nextBtn.className = 'hover-bg w-8 h-8 rounded flex items-center justify-center';
        nextBtn.onclick = () => {
            if (currentView === 'month') {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else {
                currentDate.setDate(currentDate.getDate() + 7);
            }
            render();
        };

        arrows.appendChild(prevBtn);
        arrows.appendChild(nextBtn);

        titleGroup.appendChild(title);
        titleGroup.appendChild(arrows);

        // View Toggles
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

            // Active State
            const isMes = (view === 'Mes' && currentView === 'month');
            const isSem = (view === 'Semana' && currentView === 'week');

            if (isMes || isSem) {
                btn.style.backgroundColor = 'var(--bg-active)';
                btn.style.color = 'var(--text-main)';
            } else {
                btn.style.color = 'var(--text-muted)';
            }

            btn.onclick = () => {
                currentView = view === 'Mes' ? 'month' : 'week';
                render();
            };

            controls.appendChild(btn);
        });

        header.appendChild(titleGroup);
        header.appendChild(controls);

        // Grid Container
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        grid.style.display = 'grid';
        grid.style.gap = '1px';
        grid.style.backgroundColor = 'var(--border-light)';
        grid.style.border = '1px solid var(--border-light)';
        grid.style.borderRadius = 'var(--radius-md)';
        // grid.style.overflow = 'hidden'; // REMOVED CAUSING CUTOFF
        grid.style.overflow = 'auto'; // Allow internal scroll if needed
        grid.style.flex = '1'; // Take remaining space

        if (currentView === 'month') {
            grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
            // Use auto rows to prevent cutting off if fixed height is too large
            grid.style.gridAutoRows = 'minmax(80px, 1fr)';
            renderMonthView(grid, year, month);
        } else {
            grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
            grid.style.gridAutoRows = 'minmax(300px, 1fr)'; // Tall week view
            renderWeekView(grid, currentDate);
        }

        container.appendChild(header);
        container.appendChild(grid);
    };

    // Helper: Month View
    const renderMonthView = (grid, year, month) => {
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        days.forEach(day => {
            const el = document.createElement('div');
            el.innerText = day;
            el.className = 'flex justify-center items-center text-muted text-xs';
            el.style.backgroundColor = 'var(--bg-app)';
            el.style.padding = '4px'; // Reduced from 8px
            el.style.fontWeight = '500';
            el.style.height = '30px'; // Reduced height
            grid.appendChild(el);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const events = getEvents(); // All events

        // Empty cells
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.style.backgroundColor = 'var(--bg-card)';
            grid.appendChild(empty);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const cellDate = new Date(year, month, i);
            const dateStr = cellDate.toISOString().split('T')[0];

            const cell = document.createElement('div');
            cell.style.backgroundColor = 'var(--bg-card)';
            cell.style.padding = '6px';
            cell.className = 'hover-bg flex-col gap-xs';
            cell.style.cursor = 'pointer';

            const dateNum = document.createElement('span');
            dateNum.className = 'text-xs text-muted';
            dateNum.innerText = i;

            // Highlight today
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
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

            // Filter Events for this day
            const dayEvents = events.filter(e => e.date === dateStr);
            dayEvents.forEach(e => {
                const badge = document.createElement('div');
                badge.className = 'text-xs truncate';
                badge.innerText = e.title;
                badge.style.padding = '2px 4px';
                badge.style.backgroundColor = `${e.color}44`;
                badge.style.color = e.color;
                badge.style.borderRadius = '2px';
                badge.style.marginTop = '2px';
                cell.appendChild(badge);
            });

            // Add Event Logic
            cell.onclick = () => {
                const title = prompt(`Nuevo evento para ${dateStr}:`);
                if (title) {
                    addEvent({
                        title,
                        date: dateStr,
                        color: 'var(--text-main)' // Default color
                    });
                    render(); // Re-render to show new event
                }
            };

            grid.appendChild(cell);
        }
    };

    // Helper: Week View
    const renderWeekView = (grid, refDate) => {
        // Find Sunday of the current week
        const startOfWeek = new Date(refDate);
        startOfWeek.setDate(refDate.getDate() - refDate.getDay());

        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        // Render Columns
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            const dateStr = d.toISOString().split('T')[0];

            const col = document.createElement('div');
            col.className = 'flex-col hover-bg';
            col.style.backgroundColor = 'var(--bg-card)';
            col.style.padding = '8px';
            col.style.borderLeft = i > 0 ? '1px solid var(--border-light)' : 'none';
            col.style.cursor = 'pointer';

            // Header of col
            const head = document.createElement('div');
            head.className = 'text-center border-b pb-2 mb-2';
            head.style.borderBottom = '1px solid var(--border-light)';
            head.innerHTML = `
                <div class="text-xs text-muted uppercase">${days[i]}</div>
                <div class="text-lg font-bold">${d.getDate()}</div>
            `;
            col.appendChild(head);

            // Events
            const events = getEvents().filter(e => e.date === dateStr);
            events.forEach(e => {
                const badge = document.createElement('div');
                badge.innerText = e.title;
                badge.style.padding = '4px 8px';
                badge.style.backgroundColor = `${e.color}44`;
                badge.style.color = e.color;
                badge.style.borderRadius = '4px';
                badge.style.marginBottom = '4px';
                badge.style.fontSize = '0.85rem';
                col.appendChild(badge);
            });

            // Add action
            col.onclick = () => {
                const title = prompt(`Nuevo evento para ${dateStr}:`);
                if (title) {
                    addEvent({
                        title,
                        date: dateStr,
                        color: 'var(--text-main)'
                    });
                    render();
                }
            };

            grid.appendChild(col);
        }
    };

    render(); // Initial
    window.addEventListener('data-change-events', render); // AI updates

    return container;
}
