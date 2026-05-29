export const calculateDensity = (mass, volume) => {
  if (!volume || volume == 0) return 0;
  return mass / volume;
};