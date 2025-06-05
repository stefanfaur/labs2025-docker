import {ProductFilter} from '../domain/product-filters.model';

export function buildQueryParams(
  filters: ProductFilter,
  includeQuestionMark = true
): string {
  const parts: string[] = [];

  for (const key in filters) {
    const { value, matchMode } = filters[key];
    if (value == null) continue;  // skip null or undefined

    const k = encodeURIComponent(key);
    const m = encodeURIComponent(matchMode);
    const v = encodeURIComponent(value);
    parts.push(`${k}[${m}]=${v}`);
  }

  if (parts.length === 0) return "";
  return includeQuestionMark ? `?${parts.join("&")}` : parts.join("&");
}
