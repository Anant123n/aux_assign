import React, { useState, useEffect } from "react";
import { loadData, saveData } from "./utils/storage";
import Category from "./components/Category";
import SearchBar from "./components/SearchBar";

const STORAGE_KEY = "dashboard_data";

export default function App() {
  // Load categories from localStorage (with a default one if empty)
  const [categories, setCategories] = useState(() =>
    loadData(STORAGE_KEY, [
      {
        id: 1,
        name: "CSPM Executive Dashboard",
        widgets: [
          { id: 1, title: "Widget A", text: "Sample text A" },
          { id: 2, title: "Widget B", text: "Sample text B" },
        ],
      },
    ])
  );

  const [searchTerm, setSearchTerm] = useState("");

  // Persist categories in localStorage whenever they change
  useEffect(() => {
    saveData(STORAGE_KEY, categories);
  }, [categories]);

  // Add a new widget inside a category
  const addWidget = (categoryId, widget) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, { id: Date.now(), ...widget }] }
          : cat
      )
    );
  };

  // Remove widget from a category
  const removeWidget = (categoryId, widgetId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter((w) => w.id !== widgetId) }
          : cat
      )
    );
  };

  // Apply search filter across all widgets
  const filteredCategories = categories.map((cat) => ({
    ...cat,
    widgets: cat.widgets.filter(
      (w) =>
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.text.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard</h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        <div className="grid grid-cols-1 gap-8">
          {filteredCategories.map((cat) => (
            <Category
              key={cat.id}
              category={cat}
              onAddWidget={addWidget}
              onRemoveWidget={removeWidget}
            />
          ))}
        </div>
      </main>

      {/* Footer (always at bottom) */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Dashboard App · Built with React + Vite + Tailwind
      </footer>
    </div>
  );
}
