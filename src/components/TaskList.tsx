import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks, deleteTask } = useTasks();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Your Tasks</h2>
        <Button as={Link} to="/tasks/new">+ New Task</Button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks yet. Create your first task.</p>) : (
        tasks.map(t => (
          <TaskItem key={t.id} task={t} onDelete={deleteTask} />
        ))
      )}
    </div>
  );
}
