import { Bell, ChevronDown, Cloud, HelpCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSelectedRange } from "../store/dashboardSlice";
import SearchBar from "./SearchBar";

export default function Header() {
  const dispatch = useDispatch();
  const { searchQuery, selectedRange } = useSelector((state) => state.dashboard);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#dashboard-title" className="brand" aria-label="CNAPP home">
          <span className="brand-mark"><Cloud size={20} aria-hidden="true" /></span>
          <span>CloudSec</span>
        </a>

        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <span>Home</span><span aria-hidden="true">/</span><strong>Dashboard V2</strong>
        </nav>

        <SearchBar value={searchQuery} onChange={(value) => dispatch(setSearchQuery(value))} />

        <div className="topbar-tools">
          <label className="range-select">
            <span className="sr-only">Dashboard time range</span>
            <select
              value={selectedRange}
              onChange={(event) => dispatch(setSelectedRange(event.target.value))}
            >
              <option>Last 24 hours</option>
              <option>Last 2 days</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
          <button className="header-icon" type="button" aria-label="Help">
            <HelpCircle size={19} aria-hidden="true" />
          </button>
          <button className="header-icon notification-button" type="button" aria-label="Notifications">
            <Bell size={19} aria-hidden="true" /><span aria-hidden="true" />
          </button>
          <div className="avatar" aria-label="Signed in as Anant">AN</div>
        </div>
      </div>
    </header>
  );
}
