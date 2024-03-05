import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CovalentLayoutModule } from '@covalent/core/layout';
/* any other core modules */
// (optional) Additional Covalent Modules imports
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterOutlet,
    CovalentLayoutModule,
    // (optional) Additional Covalent Modules imports
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentBaseEchartsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'UI';
  routes = [
    {
      route: '/login',
      icon: '',
      title:"Đăng nhập"
    },
    { route: '/bar', icon: '',title:"Đăng ký" },
  ];
}
