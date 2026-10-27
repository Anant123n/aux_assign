import { BarChart3, MoreHorizontal, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/dashboardSlice";

function DonutWidget({ widget }) {
  const total = widget.segments.reduce((sum, item) => sum + item.value, 0);
  let progress = 0;
  const gradient = widget.segments
    .map((segment) => {
      const start = progress;
      progress += (segment.value / total) * 100;
      return `${segment.color} ${start}% ${progress}%`;
    })
    .join(", ");

  return (
    <div className="donut-layout">
      <div className="donut" style={{ background: `conic-gradient(${gradient})` }}>
        <div className="donut-center"><strong>{widget.centerValue}</strong><span>{widget.centerLabel}</span></div>
      </div>
      <ul className="legend">
        {widget.segments.map((segment) => (
          <li key={segment.label}>
            <span style={{ backgroundColor: segment.color }} />
            <span>{segment.label}</span>
            <strong>{segment.value.toLocaleString()}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyWidget({ widget }) {
  return <div className="empty-widget"><BarChart3 size={34} strokeWidth={1.35} aria-hidden="true" /><span>{widget.text}</span></div>;
}

function RiskWidget({ widget }) {
  const combined = widget.segments.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="risk-widget">
      <div className="metric"><strong>{widget.total.toLocaleString()}</strong><span>{widget.totalLabel}</span></div>
      <div className="risk-bar" aria-label={`${widget.total} ${widget.totalLabel}`}>
        {widget.segments.map((segment) => (
          <span
            key={segment.label}
            style={{ backgroundColor: segment.color, width: `${Math.max((segment.value / combined) * 100, 5)}%` }}
          />
        ))}
      </div>
      <ul className="risk-legend">
        {widget.segments.map((segment) => (
          <li key={segment.label}><span style={{ backgroundColor: segment.color }} />{segment.label} <strong>({segment.value})</strong></li>
        ))}
      </ul>
    </div>
  );
}

function TextWidget({ widget }) {
  return <div className="text-widget"><span>Custom insight</span><p>{widget.text}</p></div>;
}

export default function Widget({ categoryId, widget }) {
  const dispatch = useDispatch();
  const content = {
    donut: <DonutWidget widget={widget} />,
    empty: <EmptyWidget widget={widget} />,
    risk: <RiskWidget widget={widget} />,
    text: <TextWidget widget={widget} />,
  }[widget.type] ?? <TextWidget widget={widget} />;

  return (
    <article className="widget-card">
      <div className="widget-header">
        <div><h3>{widget.title}</h3><p>{widget.description}</p></div>
        <div className="widget-actions">
          <button type="button" aria-label={`More options for ${widget.title}`}><MoreHorizontal size={18} aria-hidden="true" /></button>
          <button
            type="button"
            aria-label={`Remove ${widget.title}`}
            title="Remove widget"
            onClick={() => dispatch(removeWidget({ categoryId, widgetId: widget.id }))}
          ><X size={17} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="widget-content">{content}</div>
    </article>
  );
}
