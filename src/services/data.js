// Data Service - Centralized State Management

const STORAGE_KEYS = {
    TASKS: 'notionia_tasks',
    PROJECTS: 'notionia_projects',
    EVENTS: 'notionia_events'
};

// --- TASKS ---
export function getTasks() {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [
        { id: 1, title: 'Investigar Modelos IA', priority: 'Alta', due: 'Hoy', done: false },
        { id: 2, title: 'Borrador Sistema Diseño', priority: 'Media', due: 'Mañana', done: true },
        { id: 3, title: 'Comprar Leche', priority: 'Baja', due: 'Hoy', done: false }
    ];
}

export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    window.dispatchEvent(new Event('data-change-tasks'));
}

export function addTask(task) {
    const tasks = getTasks();
    task.id = Date.now();
    tasks.unshift(task);
    saveTasks(tasks);
    return task;
}

export function deleteTask(id) {
    const tasks = getTasks().filter(t => t.id !== id);
    saveTasks(tasks);
}

// --- PROJECTS ---
export function getProjects() {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return data ? JSON.parse(data) : [
        { id: 1, title: 'Rediseño Web', status: 'En Progreso', progress: 65, color: '#a68a64' },
        { id: 2, title: 'App Móvil', status: 'Planificación', progress: 10, color: '#8c7b6c' },
    ];
}

export function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    window.dispatchEvent(new Event('data-change-projects'));
}

export function addProject(project) {
    const projects = getProjects();
    project.id = Date.now();
    projects.push(project);
    saveProjects(projects);
    return project;
}

export function deleteProject(id) {
    const projects = getProjects().filter(p => p.id !== id);
    saveProjects(projects);
}

// --- CALENDAR EVENTS ---
export function getEvents() {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [
        { id: 1, title: 'Reunión Equipo', date: new Date().toISOString().split('T')[0], color: '#a68a64' }
    ];
}

export function saveEvents(events) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    window.dispatchEvent(new Event('data-change-events'));
}

export function addEvent(event) {
    const events = getEvents();
    event.id = Date.now();
    events.push(event);
    saveEvents(events);
    return event;
}

// --- AI CONTEXT HELPER ---
export function getFullContext() {
    return {
        tasks: getTasks(),
        projects: getProjects(),
        events: getEvents(),
        today: new Date().toLocaleDateString()
    };
}
