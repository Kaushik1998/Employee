import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { DummyApiService } from '../services/dummy-api/dummy-api.service';

// TODO: Replace this with your own data model type
export interface EmployeeTableItem {
  employee_name: string;
  employee_id: number;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
}

/**
 * Data source for the EmployeeTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeeTableDataSource extends DataSource<EmployeeTableItem> {
  data: EmployeeTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private dummy: DummyApiService) {
    super();
    this.dummy.getEmployees().subscribe((employees: EmployeeTableItem[]) => {
      this.data = employees;
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EmployeeTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EmployeeTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EmployeeTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'employee_name':
          return compare(a.employee_name, b.employee_name, isAsc);
        case 'employee_id':
          return compare(+a.employee_id, +b.employee_id, isAsc);
        case 'employee_age':
          return compare(+a.employee_id, +b.employee_id, isAsc);
        case 'employee_salary':
          return compare(+a.employee_id, +b.employee_id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
