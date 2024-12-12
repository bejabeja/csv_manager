export function getPagination(
  limitNumber: number,
  pageNumber: number,
  data: Array<Record<string, string>>
) {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limitNumber);
  const currentPage = Math.max(1, pageNumber);
  const offset = (currentPage - 1) * limitNumber;
  const paginatedData = data.slice(offset, offset + limitNumber);
  return { paginatedData, currentPage, totalPages, totalItems };
}
