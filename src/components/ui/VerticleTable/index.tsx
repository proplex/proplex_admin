

import { TableContent } from './TableContent';

// Define the props interface
interface VerticalTableProps {
  title: string;
  addButtonText: string;
  items: any[];
  handleAdd: () => void;
  handleEdit: (item: number) => void;
  handleDelete: (id: string | number) => void;
  emptyStateMessage?: string;
}


// Using default export with typed props
export default function VerticalTable({
  title,
  addButtonText,
  items,
  handleAdd,
  handleEdit,
  handleDelete,
  emptyStateMessage = 'No items found',
}: VerticalTableProps) {
  return (
    <TableContent
      title={title}
      addButtonText={addButtonText}
      items={items}
      onAddItem={handleAdd}
      onEditItem={handleEdit}
      onDeleteItem={handleDelete}
      emptyStateMessage={emptyStateMessage}
    />
  );
}
