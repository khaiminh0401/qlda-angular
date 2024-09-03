import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { AppConst } from './app.const';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService, UserInfo } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  hideMenu: boolean = false;
  userInfo!: UserInfo | null;

  constructor(private router: Router, private appService: AppService) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.userInfo = this.appService.getUser();
      if (event instanceof NavigationStart) {
        // nếu truy cập tới /logout thì clear cache
        if (event.url.includes('logout')) {
          localStorage.removeItem(AppConst.common.key_token);
          localStorage.removeItem('user_info');
          localStorage.removeItem('username');
          setTimeout(() => {
            this.router.navigate([AppConst.page.login]);
          }, 5000);
        }
      }
      if (event instanceof NavigationEnd) {
        /**
         * *: Nếu url hiện tại là login thì hide
         */
        if (event.url.includes(AppConst.page.login)) {
          if (!this.appService.isAuthenticated()) {
            this.hideMenu = true;
            return;
          }
          // Trường hợp đã login rồi thì redirect về trang chủ
          this.router.navigate([AppConst.page.home]);
        }
        this.hideMenu = false;
      }
    });
  }
}
