import { IEmployee } from './../interfaces/IEmployee';
import { DummyApiService } from './../services/dummy-api/dummy-api.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//{"id":"1","employee_name":"Tiger Nixon","employee_salary":"320800","employee_age":"61","profile_image":""}

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements AfterViewInit, OnInit {
  employees: IEmployee[] = null;
  displayedColumns: string[] = [
    'id',
    'employee_name',
    'employee_salary',
    'employee_age',
  ];
  dataSource: MatTableDataSource<IEmployee>;

  constructor(private dummy: DummyApiService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dummy.getEmployees().subscribe((data: IEmployee[]) => {
      this.employees = data;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.sort = this.sort;
    });
  }
}
