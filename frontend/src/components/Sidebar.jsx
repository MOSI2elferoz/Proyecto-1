import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Users } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FolderKanban size={28} />
        <span>SyncFlow</span>
      </div>
      
      <nav className="nav-links">
        <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/projects" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <FolderKanban size={20} /> Proyectos
        </NavLink>
        <NavLink to="/tasks" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <CheckSquare size={20} /> Tareas
        </NavLink>
      </nav>
    </aside>
  );
}
