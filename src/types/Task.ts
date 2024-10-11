export interface Task {
  id: number
  title: string
  description: string
  status: 'Completed' | 'In Progress' | 'Pending'
  user: string
}

export interface TaskCardProps {
  task: Task
  onEditTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
}

export interface TaskListProps {
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
}

export interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  data?: Task | null
  onTaskCreated: (newTask: Task) => void
  handleTaskEdited: (newTask: Task) => void
}

export interface TaskDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  data?: Task | null
}
