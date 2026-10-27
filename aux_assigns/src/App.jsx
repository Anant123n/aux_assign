import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreVertical, Plus, RefreshCw, RotateCcw, ShieldCheck } from "lucide-react";
import AddWidgetDrawer from "./components/AddWidgetDrawer";
import Category from "./components/Category";
import Header from "./components/Header";
import { openWidgetDrawer, resetDashboard } from "./store/dashboardSlice";

export default function App() {
  const dispatch = useDispatch();
  const { appName, categories, searchQuery } = useSelector((state) => state.dashboard);

  const visibleCategories = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        visibleWidgets: category.widgets.filter(
          (widget) =>
            widget.enabled &&
            (!normalizedQuery ||
              widget.title.toLowerCase().includes(normalizedQuery) ||
              widget.description?.toLowerCase().includes(normalizedQuery) ||
              widget.text?.toLowerCase().includes(normalizedQuery)),
        ),
      }))
      .filter(
        (category) =>
          !normalizedQuery ||
          category.name.toLowerCase().includes(normalizedQuery) ||
          category.visibleWidgets.length > 0,
      );
  }, [categories, searchQuery]);

  const hasResults = visibleCategories.some((category) => category.visibleWidgets.length > 0);

  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard">
        <section className="dashboard-heading" aria-labelledby="dashboard-title">
          <div>
            <div className="eyebrow">
              <ShieldCheck size={14} aria-hidden="true" />
              Security overview
            </div>
            <h1 id="dashboard-title">{appName}</h1>
            <p>Monitor cloud security posture, workloads, and registry risks.</p>
          </div>

          <div className="dashboard-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={() => dispatch(openWidgetDrawer())}
            >
              <Plus size={17} aria-hidden="true" />
              Add widget
            </button>
            <button className="icon-button" type="button" aria-label="Refresh dashboard">
              <RefreshCw size={17} aria-hidden="true" />
            </button>
            <button
              className="icon-button"
              type="button"
              aria-label="Reset dashboard"
              title="Reset dashboard"
              onClick={() => dispatch(resetDashboard())}
            >
              <RotateCcw size={17} aria-hidden="true" />
            </button>
            <button className="icon-button" type="button" aria-label="More options">
              <MoreVertical size={18} aria-hidden="true" />
            </button>
          </div>
        </section>

        {hasResults ? (
          <div className="category-list">
            {visibleCategories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <section className="no-results" aria-live="polite">
            <div className="no-results-icon">⌕</div>
            <h2>No widgets found</h2>
            <p>Try a different title, description, or widget value.</p>
          </section>
        )}
      </main>

      <AddWidgetDrawer />
    </div>
  );
}
