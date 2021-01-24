import { ApiService } from '../../services/api/api.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as EventEmitter from 'events';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.api.register(this.form.value).subscribe((data) => {
        console.log('User registered');
        this.router.navigate(['/login']);
      });
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {}
}
