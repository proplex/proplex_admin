import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type BoardMembersHeaderProps = {
  onAdd: () => void;
};

const BoardMembersHeader: React.FC<BoardMembersHeaderProps> = ({ onAdd }) => {
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Additional Board Members</h2>
      </div>
      <Button
        variant="outline"
        className="text-black transition-colors duration-300"
        type="button"
        onClick={onAdd}
      >
        <Plus size={16} className="stroke-2 text-gray-700" /> Add Director
      </Button>
    </div>
  );
};

export default BoardMembersHeader;
