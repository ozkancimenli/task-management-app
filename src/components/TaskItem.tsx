import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Task } from '../types/task';

export default function TaskItem({ task, onDelete }: { task: Task; onDelete: (id: string) => void; }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-1">{task.title}</Card.Title>
            <div className="text-muted small mb-2">{task.description || '—'}</div>
            <div className="d-flex gap-2">
              <Badge bg={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'secondary'}>
                {task.priority}
              </Badge>
              <Badge bg={task.status === 'done' ? 'success' : task.status === 'in-progress' ? 'info' : 'secondary'}>
                {task.status}
              </Badge>
              {task.dueDate && <Badge bg="dark">due {new Date(task.dueDate).toLocaleDateString()}</Badge>}
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button as={Link} to={`/tasks/${task.id}`} variant="outline-primary" size="sm">Details</Button>
            <Button as={Link} to={`/tasks/${task.id}/edit`} variant="outline-secondary" size="sm">Edit</Button>
            <Button onClick={() => onDelete(task.id)} variant="outline-danger" size="sm">Delete</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
