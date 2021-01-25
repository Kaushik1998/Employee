import { NotifierService } from './../../services/notifier.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { ApiService } from '../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  username: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  form: FormGroup = new FormGroup({
    username: this.username,
    password: this.password,
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.api.login(this.form.value).subscribe(
        (success) => {
          this.notifier.notify('Logged In');
          this.router.navigate(['/table']);
        },
        (error: HttpErrorResponse) => {
          this.notifier.notify(error.error);
        }
      );
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(
    private api: ApiService,
    private router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {}
}
