import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AppConst } from './app.const';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-qlda';
  hideMenu: boolean = false;
  constructor(private router: Router, private location: Location, private titleService: Title) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * *TDDO: Nếu url hiện tại là login thì hide
         */
        if (this.location.path().includes(AppConst.page.login)) {
          this.hideMenu = true;
          return;
        }
        this.hideMenu = false;
      }
    });
  }
}
