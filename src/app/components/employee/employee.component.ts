import { DummyApiService } from './../../services/dummy-api/dummy-api.service';
import { Observable } from 'rxjs';
import { IEmployee } from './../../interfaces/IEmployee';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeFromState: IEmployee | any = {};
  employeeFromApi: IEmployee;
  id: number;
  sub: Observable<Params>;

  constructor(
    private router: Router,
    location: Location,
    private route: ActivatedRoute,
    private dummy: DummyApiService
  ) {
    this.employeeFromState = this.router.getCurrentNavigation().extras.state;

    location.subscribe((success) => {
      console.log(success);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.dummy.getEmployee(this.id).subscribe((employee: any) => {
        this.employeeFromApi = employee;
      });
    });
  }
}
