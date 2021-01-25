import { NotifierService } from './../../services/notifier.service';
import { ApiService } from '../../services/api/api.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as EventEmitter from 'events';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
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
      this.api.register(this.form.value).subscribe(
        (success) => {
          this.notifier.notify('User registered');
          this.router.navigate(['/login']);
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
