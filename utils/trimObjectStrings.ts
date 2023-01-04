export const trimObjectStrings = <T>(target: T): T => {
  if (typeof target !== "object") return target;

  return Object.keys(target).reduce((prev, curr) => {
    const val = target[curr];
    const newValue =
      typeof val === "string"
        ? val.trim()
        : typeof val === "object" && val !== null && !Array.isArray(val)
        ? trimObjectStrings(val)
        : val;
    return {
      ...prev,
      [curr]: newValue,
    };
  }, {} as T);
};
