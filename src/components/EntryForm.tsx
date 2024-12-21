import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';

interface EntryFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
    labels: string[];
  }) => void;
}

export function EntryForm({ onSubmit }: EntryFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [currentLabel, setCurrentLabel] = useState('');
  const [labels, setLabels] = useState<string[]>([]);

  const handleAddLabel = () => {
    if (currentLabel.trim() && !labels.includes(currentLabel.trim())) {
      setLabels([...labels, currentLabel.trim()]);
      setCurrentLabel('');
    }
  };

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter((l) => l !== label));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && category) {
      onSubmit({ title, description, category, labels });
      setTitle('');
      setDescription('');
      setCategory('');
      setLabels([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Tag size={20} className="text-gray-500" />
        <input
          type="text"
          value={currentLabel}
          onChange={(e) => setCurrentLabel(e.target.value)}
          placeholder="Add Label"
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && handleAddLabel()}
        />
        <button
          type="button"
          onClick={handleAddLabel}
          className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          <span
            key={label}
            className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 rounded"
          >
            {label}
            <button
              type="button"
              onClick={() => handleRemoveLabel(label)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <X size={16} />
            </button>
          </span>
        ))}
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Start Tracking
      </button>
    </form>
  );
}