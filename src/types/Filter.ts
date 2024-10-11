export interface Filter {
  title: string
  status: string
  user: string
}

export interface FilterBarProps {
  filter: Filter
  updateFilter: (field: keyof Filter, value: string) => void
}

export interface Filter {
  title: string
  status: string
  user: string
}

export interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filter: Filter
  updateFilter: (key: keyof Filter, value: string) => void
  onApply: () => void
}
