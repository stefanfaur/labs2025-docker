import {SortConfig} from '../feature-product-list/sort/sort.component';


export function createSorter(config: SortConfig) {
  const {field, direction} = config;

  return (a: any, b: any): number => {
    const valA = a[field];
    const valB = b[field];

    // Normalize null/undefined
    if (valA == null && valB == null) return 0;
    if (valA == null) return direction === 'asc' ? 1 : -1;
    if (valB == null) return direction === 'asc' ? -1 : 1;

    // Numeric comparison
    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'asc' ? valA - valB : valB - valA;
    }

    // Fallback to string comparison
    const strA = String(valA).localeCompare(String(valB), undefined, {sensitivity: 'base'});
    return direction === 'asc' ? strA : -strA;
  };
}
