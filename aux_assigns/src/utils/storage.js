export const loadData = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
