import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import type { TaskFormValues } from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';

export default function TaskEditPage() {
  const { id } = useParams<{ id: string }>();
  const { getTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const task = id ? getTask(id) : undefined;
  if (!task) return <p>Task not found.</p>;

  const handleSubmit = (values: TaskFormValues) => {
    updateTask(task.id, {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      status: values.status,
      priority: values.priority,
    });
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div>
      <h1 className="mb-3">Edit Task</h1>
      <TaskForm initial={task} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
}
