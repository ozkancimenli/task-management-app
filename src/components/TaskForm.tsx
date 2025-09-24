import { useEffect, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import type { Priority, Status, Task } from '../types/task';

export interface TaskFormValues {
  title: string;
  description?: string;
  dueDate?: string; // yyyy-mm-dd formatında
  status: Status;
  priority: Priority;
}

const defaultValues: TaskFormValues = {
  title: '',
  description: '',
  dueDate: '',
  status: 'todo',
  priority: 'medium',
};

function validate(values: TaskFormValues) {
  const errors: Partial<Record<keyof TaskFormValues, string>> = {};
  if (!values.title.trim()) errors.title = 'Title is required';
  if (values.title.length > 120) errors.title = 'Keep title under 120 chars';
  if (values.description && values.description.length > 1000) errors.description = 'Keep description under 1000 chars';
  if (values.dueDate) {
    const d = new Date(values.dueDate);
    if (Number.isNaN(d.getTime())) errors.dueDate = 'Invalid date';
  }
  return errors;
}

export default function TaskForm({
  initial,
  onSubmit,
  submitLabel = 'Save Task',
}: {
  initial?: Task;
  onSubmit: (values: TaskFormValues) => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<TaskFormValues>(() => initial ? {
    title: initial.title,
    description: initial.description || '',
    dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : '',
    status: initial.status,
    priority: initial.priority,
  } : defaultValues);

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initial) {
      setValues({
        title: initial.title,
        description: initial.description || '',
        dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : '',
        status: initial.status,
        priority: initial.priority,
      });
    }
  }, [initial]);

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      if (isValid) {
        onSubmit(values);
      } else {
        setTouched({ title: true, description: !!values.description, dueDate: !!values.dueDate });
      }
    }}>
      {/* Title */}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={values.title}
          onChange={(e) => setValues(v => ({ ...v, title: e.target.value }))}
          onBlur={() => setTouched(t => ({ ...t, title: true }))}
          isInvalid={!!touched.title && !!errors.title}
          placeholder="E.g. Ship Auth feature"
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={values.description}
          onChange={(e) => setValues(v => ({ ...v, description: e.target.value }))}
          onBlur={() => setTouched(t => ({ ...t, description: true }))}
          isInvalid={!!touched.description && !!errors.description}
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>

      {/* Status, Priority, Due Date */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={values.status}
              onChange={(e) => setValues(v => ({ ...v, status: e.target.value as Status }))}
            >
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-4">
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={values.priority}
              onChange={(e) => setValues(v => ({ ...v, priority: e.target.value as Priority }))}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-4">
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={values.dueDate}
              onChange={(e) => setValues(v => ({ ...v, dueDate: e.target.value }))}
              onBlur={() => setTouched(t => ({ ...t, dueDate: true }))}
              isInvalid={!!touched.dueDate && !!errors.dueDate}
            />
            <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>

      {/* Submit */}
      <div className="d-flex gap-2">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </Form>
  );
}
