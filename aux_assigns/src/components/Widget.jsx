import React from "react";

export default function Widget({ widget, onRemove }) {
  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5">
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
        title="Remove widget"
      >
        ✕
      </button>

      {/* Widget Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {widget.title}
      </h3>

      {/* Widget Text */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {widget.text}
      </p>
    </div>
  );
}
