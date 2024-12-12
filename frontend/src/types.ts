export type Data = Array<Record<string, string>>;

export type ApiUploadResponse = {
  message: string;
  data: Data;
  pagination?: Pagination;
};

export type ApiSearchResponse = {
  data: Data;
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};
