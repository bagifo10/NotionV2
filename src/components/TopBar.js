export function TopBar() {
  const header = document.createElement('header');
  header.className = 'topbar flex items-center justify-between';
  header.style.height = '60px';
  header.style.padding = '0 var(--spacing-lg)';
  header.style.borderBottom = '1px solid var(--border-light)';
  header.style.backgroundColor = 'var(--bg-app)'; // Or transparent

  // Left: Breadcrumbs / Title
  const leftSection = document.createElement('div');
  leftSection.className = 'flex items-center gap-sm';

  // Breadcrumb logic could go here, for now static
  const breadcrumb = document.createElement('div');
  breadcrumb.className = 'flex items-center gap-sm text-muted text-sm';
  breadcrumb.innerHTML = `
    <span>Workspace</span>
    <span style="color: var(--text-dim)">/</span>
    <span style="color: var(--text-main)" id="page-title">Dashboard</span>
  `;

  leftSection.appendChild(breadcrumb);

  // Right: Actions / Search
  const rightSection = document.createElement('div');
  rightSection.className = 'flex items-center gap-md';

  // Search Input Mockup
  const searchContainer = document.createElement('div');
  searchContainer.className = 'flex items-center gap-sm';
  searchContainer.style.backgroundColor = 'var(--bg-card)';
  searchContainer.style.padding = '6px 12px';
  searchContainer.style.borderRadius = 'var(--radius-md)';
  searchContainer.style.border = '1px solid var(--border-light)';
  searchContainer.style.width = '200px';

  searchContainer.innerHTML = `
    <span style="font-size: 0.9rem; color: var(--text-dim)">🔍</span>
    <input type="text" placeholder="Buscar..." style="background:transparent; border:none; outline:none; color: var(--text-main); font-size: 0.85rem; width: 100%;">
  `;

  // Notification Icon
  const notifBtn = document.createElement('button');
  notifBtn.innerHTML = '🔔';
  notifBtn.className = 'hover-bg';
  notifBtn.style.padding = '6px';
  notifBtn.style.borderRadius = 'var(--radius-sm)';
  notifBtn.style.fontSize = '1.1rem';

  rightSection.appendChild(searchContainer);
  rightSection.appendChild(notifBtn);

  header.appendChild(leftSection);
  header.appendChild(rightSection);

  return header;
}
