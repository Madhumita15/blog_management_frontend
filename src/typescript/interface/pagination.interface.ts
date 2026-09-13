export interface PaginationInterface{
    page: number,
    limit: number;
    setLimit: (limit: number)=> void,
    setPage: (page: number) => void
}


export interface DashboardPagination{
  page: number;
  limit: number
}