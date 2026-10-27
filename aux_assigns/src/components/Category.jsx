import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { openWidgetDrawer } from "../store/dashboardSlice";
import Widget from "./Widget";

export default function Category({ category }) {
  const dispatch = useDispatch();

  return (
    <section className="category" aria-labelledby={`category-${category.id}`}>
      <div className="category-heading">
        <div>
          <h2 id={`category-${category.id}`}>{category.name}</h2>
          <span>
            {category.visibleWidgets.length} active widget{category.visibleWidgets.length === 1 ? "" : "s"}
          </span>
        </div>
        <button
          className="category-manage"
          type="button"
          onClick={() => dispatch(openWidgetDrawer(category.id))}
        >
          Manage widgets
        </button>
      </div>

      <div className="widget-grid">
        {category.visibleWidgets.map((widget) => (
          <Widget key={widget.id} categoryId={category.id} widget={widget} />
        ))}

        <button
          className="add-widget-card"
          type="button"
          onClick={() => dispatch(openWidgetDrawer(category.id))}
        >
          <span><Plus size={18} aria-hidden="true" /></span>
          <strong>Add widget</strong>
          <small>Choose from the library or create your own</small>
        </button>
      </div>
    </section>
  );
}
