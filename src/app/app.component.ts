import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppConst } from './app.const';
import { UserInfo, AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = false;
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
