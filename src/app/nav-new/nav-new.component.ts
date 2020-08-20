import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-nav-new',
  templateUrl: './nav-new.component.html',
  styleUrls: ['./nav-new.component.css']
})
export class NavNewComponent implements OnInit, OnDestroy {
  userIsAUthenticated = false;
  private authListenserSubs: Subscription;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
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
