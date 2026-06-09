export function capitalize(value) {
  if (typeof value !== "string") return value;
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default capitalize;
