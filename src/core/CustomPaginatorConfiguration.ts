import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'تعداد در هر صفحه:';
  customPaginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => `${page + 1} از ${Math.ceil(length / pageSize)}`;
  return customPaginatorIntl;
}
