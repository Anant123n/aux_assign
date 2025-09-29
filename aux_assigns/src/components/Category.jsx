import React, { useState } from "react";
import Widget from "./Widget";

export default function Category({ category, onAddWidget, onRemoveWidget }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onAddWidget(category.id, formData);
    setFormData({ title: "", text: "" });
    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          + Add Widget
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Widget Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="flex-1 px-2 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Widget Text"
            value={formData.text}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, text: e.target.value }))
            }
            className="flex-1 px-2 py-1 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {category.widgets.map((w) => (
          <Widget
            key={w.id}
            widget={w}
            onRemove={() => onRemoveWidget(category.id, w.id)}
          />
        ))}
      </div>
    </div>
  );
}
