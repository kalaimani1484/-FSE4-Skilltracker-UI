import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { SearchComponent } from './search/search.component';
import { AuthGuardService } from './_services/auth-guard.service';
//const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [{ path: '', component: LoginComponent, data : { title: 'FSE Skill Traker - Search' } },
{ path: 'login', component: LoginComponent, data : { title: 'Welcome FSE Skill Traker' } },
{ path: 'search', component: SearchComponent, canActivate: [AuthGuardService], data : { title: 'FSE Skill Traker - Search' }  },
// otherwise redirect to home
{ path: '**', redirectTo: '' }
];
const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
