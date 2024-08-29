import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, of, switchMap } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  loginForm!:FormGroup;
  constructor(
    private appService: AppService
  ){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  onSubmitForm(){
    const result = this.appService.methodPOST("auth/login", this.loginForm.value);
    console.log(result);
    return;
  }
}
