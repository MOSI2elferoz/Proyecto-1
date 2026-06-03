import { useState, useEffect } from 'react';
import { getTasks, createTask, getProjects } from '../services/api';
import { Plus } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do', projectId: '' });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // Sequelize expects projectId to be integer or null
      const data = { ...newTask };
      if (!data.projectId) delete data.projectId;
      
      await createTask(data);
      setIsModalOpen(false);
      setNewTask({ title: '', description: '', status: 'To Do', projectId: '' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'To Do': return <span className="badge badge-todo">Por hacer</span>;
      case 'In Progress': return <span className="badge badge-progress">En progreso</span>;
      case 'Done': return <span className="badge badge-done">Completado</span>;
      default: return null;
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Tareas</h1>
          <p>Supervisa el progreso del equipo.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nueva Tarea
        </button>
      </div>

      <div className="grid-cards">
        {tasks.map(task => (
          <div key={task.id} className="card glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 className="card-title">{task.title}</h3>
              {getStatusBadge(task.status)}
            </div>
            <p>{task.description || 'Sin descripción'}</p>
            {task.project && (
              <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem' }}>
                Proyecto: {task.project.title}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className={`modal-backdrop ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>Crear Nueva Tarea</h3>
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
          </div>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Título</label>
              <input 
                type="text" 
                className="form-control" 
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea 
                className="form-control" 
                rows="3"
                value={newTask.description}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
              ></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Proyecto (Opcional)</label>
              <select 
                className="form-control"
                value={newTask.projectId}
                onChange={e => setNewTask({...newTask, projectId: e.target.value})}
              >
                <option value="">-- Seleccionar Proyecto --</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
