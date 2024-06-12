export function mapForSelect<T>(val: T[], propertyName: string | null = null): { name: string; value: T }[] {
  return val.map((item) => ({ name: propertyName ? (item as any)[propertyName] : item, value: item }));
}
