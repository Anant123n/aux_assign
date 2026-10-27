import { createSlice } from "@reduxjs/toolkit";
import dashboardData from "../data/dashboard.json";
import { loadData } from "../utils/storage";

export const STORAGE_KEY = "cnapp_dashboard_v1";

const savedCategories = loadData(STORAGE_KEY, null);

const initialState = {
  appName: dashboardData.appName,
  categories: Array.isArray(savedCategories)
    ? savedCategories
    : dashboardData.categories,
  searchQuery: "",
  selectedRange: "Last 2 days",
  drawer: {
    isOpen: false,
    activeCategoryId: dashboardData.categories[0].id,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedRange(state, action) {
      state.selectedRange = action.payload;
    },
    openWidgetDrawer(state, action) {
      state.drawer.isOpen = true;
      state.drawer.activeCategoryId = action.payload ?? state.drawer.activeCategoryId;
    },
    closeWidgetDrawer(state) {
      state.drawer.isOpen = false;
    },
    selectDrawerCategory(state, action) {
      state.drawer.activeCategoryId = action.payload;
    },
    toggleWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((item) => item.id === categoryId);
      const widget = category?.widgets.find((item) => item.id === widgetId);
      if (widget) widget.enabled = !widget.enabled;
    },
    removeWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((item) => item.id === categoryId);
      const widget = category?.widgets.find((item) => item.id === widgetId);
      if (widget) widget.enabled = false;
    },
    addWidget(state, action) {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((item) => item.id === categoryId);
      if (category) category.widgets.push({ ...widget, enabled: true });
    },
    resetDashboard(state) {
      state.categories = dashboardData.categories;
      state.searchQuery = "";
      state.selectedRange = "Last 2 days";
    },
  },
});

export const {
  addWidget,
  closeWidgetDrawer,
  openWidgetDrawer,
  removeWidget,
  resetDashboard,
  selectDrawerCategory,
  setSearchQuery,
  setSelectedRange,
  toggleWidget,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
