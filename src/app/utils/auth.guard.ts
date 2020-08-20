
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userData = this.accountService.userValue;
        const user = userData;
        if (user) {
            // authorised so return true
            if (route.data.role && route.data.role.indexOf(user.role) === -1){
              this.router.navigate(['/login']);
              return false;
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
