import { useState, useEffect } from 'react';
import { getProjects, getTasks } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, tasks: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getTasks()]).then(([projectsRes, tasksRes]) => {
      setStats({
        projects: projectsRes.data.length,
        tasks: tasksRes.data.length
      });
    }).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Resumen de tu actividad reciente.</p>
      </div>

      <div className="grid-cards">
        <div className="card glass-panel">
          <h3 className="card-title">Proyectos Activos</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.projects}</p>
        </div>
        
        <div className="card glass-panel">
          <h3 className="card-title">Total de Tareas</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success)' }}>{stats.tasks}</p>
        </div>
      </div>
    </div>
  );
}
