import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  userIsAUthenticated = false;
  private authListenserSubs: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, private authservice: AuthService) {}

  ngOnInit() {
    this.userIsAUthenticated = this.authservice.getIsAuth();
    this.authListenserSubs = this.authservice.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAUthenticated = isAuthenticated;
    });
  }
  onLogout() {
    this.authservice.logout();
  }
  ngOnDestroy() {
    this.authListenserSubs.unsubscribe();
  }
}
