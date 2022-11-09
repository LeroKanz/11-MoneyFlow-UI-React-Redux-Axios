
export const mapToSelectOptions = (lookUpType) => {
     const result = Object.keys(lookUpType).map(k => ({ value: k, label: lookUpType[k] }));
     return result;
};