export const calculateOctane = (measured, norm) => {
  if (!measured || !norm) return null;
  return measured >= norm;
};