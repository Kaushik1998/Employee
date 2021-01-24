import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.api.login(this.form.value).subscribe((success) => {
        console.log('Logged In');
        this.router.navigate(['/table']);
      });
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {}
}
