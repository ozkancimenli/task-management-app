import { useNavigate } from 'react-router-dom';
import TaskForm, { type TaskFormValues } from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';

export default function TaskCreatePage() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (values: TaskFormValues) => {
    const newTask = addTask({
      title: values.title,
      description: values.description || '',
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
      status: values.status,
      priority: values.priority,
    });
    navigate(`/tasks/${newTask.id}`);
  };

  return (
    <div>
      <h1 className="mb-3">Create Task</h1>
      <TaskForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
}
