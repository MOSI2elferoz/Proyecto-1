import { useState, useEffect } from 'react';
import { getProjects, createProject } from '../services/api';
import { Plus } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      setIsModalOpen(false);
      setNewProject({ title: '', description: '' });
      fetchProjects();
    } catch (err) {
      console.error('Failed to create project', err);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Proyectos</h1>
          <p>Gestiona los proyectos de tu equipo.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuevo Proyecto
        </button>
      </div>

      <div className="grid-cards">
        {projects.map(project => (
          <div key={project.id} className="card glass-panel">
            <h3 className="card-title">{project.title}</h3>
            <p>{project.description || 'Sin descripción'}</p>
          </div>
        ))}
      </div>

      <div className={`modal-backdrop ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content glass-panel">
          <div className="modal-header">
            <h3>Crear Nuevo Proyecto</h3>
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
          </div>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Título</label>
              <input 
                type="text" 
                className="form-control" 
                value={newProject.title}
                onChange={e => setNewProject({...newProject, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea 
                className="form-control" 
                rows="3"
                value={newProject.description}
                onChange={e => setNewProject({...newProject, description: e.target.value})}
              ></textarea>
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
