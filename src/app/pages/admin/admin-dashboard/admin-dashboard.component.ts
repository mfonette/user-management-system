import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  theme: string = 'light-theme'; // Default theme
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setTheme('light-theme'); // Set the initial theme
  }

  setTheme(theme: string) {
    this.renderer.setAttribute(document.body, 'class', theme);
  }

  toggleTheme() {
    console.log('theme');
    const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }
}
