import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver,
            private overlay: OverlayContainer) {}

toggleControl = new FormControl(false);
@HostBinding('class') className = '';
darkClassName = 'theme-dark';
lightClassName = 'theme-light';

ngOnInit() {
  const storedDarkModeValue = localStorage.getItem('darkMode');
  const isDarkMode = storedDarkModeValue !== null ? storedDarkModeValue === 'true' : false;
  // Apply the theme based on the retrieved setting
  this.applyThemeClass(isDarkMode);
  this.toggleControl.setValue(isDarkMode);
  this.toggleControl.valueChanges.subscribe((darkMode: boolean | null) => {
    const isDarkMode = darkMode === null ? false : darkMode;
    this.applyThemeClass(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  });
}


applyThemeClass(darkMode: boolean) {
  this.className = darkMode ? this.darkClassName : this.lightClassName;
  const overlayContainerClasses = this.overlay.getContainerElement().classList;
  if(darkMode) {
    overlayContainerClasses.add(this.darkClassName);
  } else {
    overlayContainerClasses.remove(this.darkClassName);
  }
}
}
