import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWidget,
  closeWidgetDrawer,
  selectDrawerCategory,
  toggleWidget,
} from "../store/dashboardSlice";

const emptyForm = { title: "", text: "" };

export default function AddWidgetDrawer() {
  const dispatch = useDispatch();
  const { categories, drawer } = useSelector((state) => state.dashboard);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const titleInputRef = useRef(null);
  const activeCategory = categories.find((category) => category.id === drawer.activeCategoryId) ?? categories[0];

  useEffect(() => {
    if (!drawer.isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") dispatch(closeWidgetDrawer());
    };

    document.body.classList.add("drawer-open");
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dispatch, drawer.isOpen]);

  useEffect(() => {
    if (showForm) titleInputRef.current?.focus();
  }, [showForm]);

  if (!drawer.isOpen || !activeCategory) return null;

  const handleAdd = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.text.trim()) {
      setError("Enter both a widget name and widget text.");
      return;
    }

    dispatch(addWidget({
      categoryId: activeCategory.id,
      widget: {
        id: `custom-${Date.now()}`,
        title: form.title.trim(),
        description: "A custom dashboard insight.",
        text: form.text.trim(),
        type: "text",
      },
    }));
    setForm(emptyForm);
    setError("");
    setShowForm(false);
  };

  return (
    <div className="drawer-layer" role="presentation">
      <button
        className="drawer-backdrop"
        type="button"
        aria-label="Close widget panel"
        onClick={() => dispatch(closeWidgetDrawer())}
      />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <header className="drawer-header">
          <div><span>Personalise dashboard</span><h2 id="drawer-title">Add widget</h2></div>
          <button type="button" aria-label="Close" onClick={() => dispatch(closeWidgetDrawer())}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="drawer-body">
          <p className="drawer-intro">Select existing widgets or create a custom widget for this dashboard.</p>

          <div className="drawer-tabs" role="tablist" aria-label="Widget categories">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={category.id === activeCategory.id}
                className={category.id === activeCategory.id ? "active" : ""}
                onClick={() => {
                  dispatch(selectDrawerCategory(category.id));
                  setShowForm(false);
                  setError("");
                }}
              >
                {category.shortName}
              </button>
            ))}
          </div>

          <div className="widget-checklist">
            <div className="checklist-heading">
              <div>
                <h3>{activeCategory.name}</h3>
                <span>{activeCategory.widgets.filter((widget) => widget.enabled).length} selected</span>
              </div>
              <button type="button" onClick={() => setShowForm((value) => !value)}>
                <Plus size={16} aria-hidden="true" /> New widget
              </button>
            </div>

            {showForm && (
              <form className="new-widget-form" onSubmit={handleAdd}>
                <label>
                  Widget name
                  <input
                    ref={titleInputRef}
                    value={form.title}
                    maxLength={60}
                    placeholder="e.g. Policy coverage"
                    onChange={(event) => {
                      setForm((value) => ({ ...value, title: event.target.value }));
                      setError("");
                    }}
                  />
                </label>
                <label>
                  Widget text
                  <textarea
                    value={form.text}
                    maxLength={220}
                    placeholder="Add a short insight or status update..."
                    onChange={(event) => {
                      setForm((value) => ({ ...value, text: event.target.value }));
                      setError("");
                    }}
                  />
                </label>
                {error && <p className="form-error">{error}</p>}
                <div className="form-actions">
                  <button className="button button-ghost" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="button button-primary" type="submit">Add widget</button>
                </div>
              </form>
            )}

            <div className="checklist-items">
              {activeCategory.widgets.map((widget) => (
                <label className="checklist-item" key={widget.id}>
                  <input
                    type="checkbox"
                    checked={widget.enabled}
                    onChange={() => dispatch(toggleWidget({ categoryId: activeCategory.id, widgetId: widget.id }))}
                  />
                  <span className="custom-checkbox" aria-hidden="true" />
                  <span><strong>{widget.title}</strong><small>{widget.description}</small></span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <footer className="drawer-footer">
          <button className="button button-ghost" type="button" onClick={() => dispatch(closeWidgetDrawer())}>Cancel</button>
          <button className="button button-primary" type="button" onClick={() => dispatch(closeWidgetDrawer())}>Confirm changes</button>
        </footer>
      </aside>
    </div>
  );
}
