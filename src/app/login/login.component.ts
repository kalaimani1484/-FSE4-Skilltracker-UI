import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    loginDisplay = false;
    private readonly _destroying$ = new Subject<void>();

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.returnUrl = '../search';
  }

      // convenience getter for easy access to form fields
      get f() { return this.form.controls; }

      onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        debugger;
        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data && data.token != null) {
                        this.router.navigate([this.returnUrl]);
                    }
                    else {
                        this.alertService.error("User not found!. If you are new user please click Register.");
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error("User not found!. If you are new user please click Register.");
                    this.loading = false;
                });
    }
}
