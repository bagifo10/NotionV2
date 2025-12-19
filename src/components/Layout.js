import { Sidebar } from './Sidebar.js';
import { TopBar } from './TopBar.js';

export function Layout() {
    const app = document.getElementById('app');

    // Create Main Container
    const container = document.createElement('div');
    container.className = 'layout flex w-full h-full';

    // Render Sidebar
    container.appendChild(Sidebar());

    // Create Content Area
    const contentArea = document.createElement('main');
    contentArea.className = 'flex-col w-full h-full relative';
    contentArea.style.backgroundColor = 'var(--bg-app)';

    // Render TopBar
    contentArea.appendChild(TopBar());

    // Content Wrapper (Pages will go here)
    const pageContainer = document.createElement('div');
    pageContainer.id = 'page-content';
    pageContainer.className = 'page-content';
    pageContainer.style.padding = 'var(--spacing-lg)';
    pageContainer.style.height = 'calc(100% - 60px)'; // Adjust based on TopBar height
    pageContainer.style.overflowY = 'auto';

    contentArea.appendChild(pageContainer);
    container.appendChild(contentArea);

    return container;
}
