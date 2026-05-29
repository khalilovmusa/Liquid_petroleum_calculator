export const calculateError = (measured, norm) => {
  if (!measured || !norm) return null;
  return (Math.abs(measured - norm) / norm) * 100;
};