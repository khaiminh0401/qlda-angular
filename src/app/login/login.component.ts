import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ImageService } from '../service/image.service';
import { AppCommon } from '../app.common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppConst } from '../app.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements AppCommon, OnInit {
  
  loginForm!:FormGroup;
  public initImg: boolean = false;

  constructor(
    private appService: AppService,
    public imageService: ImageService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.setDefault();
  }

  setDefault(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * * Sự kiện nhấn nút đăng nhập
   * * Call API: auth/login
   */
  async onSubmitForm(){
    const result = await this.appService.methodPOST("auth/login", this.loginForm.value);
    if(result?.status == 1){
      localStorage.setItem("tokenUser", result.data.access_token);
      this.router.navigate([AppConst.page.home]);
    }
    return;
  }
  onLoad(){
    this.initImg = true;
  }
}
