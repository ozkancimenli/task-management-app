import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';

export default function TaskDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { getTask } = useTasks();
  const task = id ? getTask(id) : undefined;

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description || 'No description.'}</Card.Text>
        <p>Status: <strong>{task.status}</strong></p>
        <p>Priority: <strong>{task.priority}</strong></p>
        {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
        <div className="d-flex gap-2">
          <Button as={Link as any} to={`/tasks/${task.id}/edit`} variant="secondary">Edit</Button>
          <Button as={Link as any} to="/" variant="outline-primary">Back</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
