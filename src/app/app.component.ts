import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AccountService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fse4-ui';
  isIframe = false;
    loginDisplay = false;
    returnUrl = 'search';
    private readonly _destroying$ = new Subject<void>();

    constructor(private router: Router,
      private activatedRoute: ActivatedRoute,
      private titleService: Title,
      private authService: AccountService
    ){}
    
    ngOnInit() {
      this.isIframe = window !== window.parent && !window.opener;
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
        const rt = this.getChild(this.activatedRoute);
        rt.data.subscribe(data => {
            this.titleService.setTitle(data.title)
        });
    });
    }
       // unsubscribe to events when component is destroyed
       ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
      }

    getChild(activatedRoute: ActivatedRoute) {
        if (activatedRoute.firstChild) {
            return this.getChild(activatedRoute.firstChild);
        } else {
            return activatedRoute;
        }
      }
      
      login() {
        if(this.authService.validateUser()){
          this.router.navigate([this.returnUrl])
        }
      }
    
      logout() {
        this.authService.logout();
      }
}
