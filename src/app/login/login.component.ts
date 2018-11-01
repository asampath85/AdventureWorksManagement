import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private router: Router, private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.activatedRoute.snapshot.data.logout) {
      this.logout();
    }
  }

  login(): void {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.valid) {
      this.toastrService.warning('Logging you in...', 'Verifying credentials', { disableTimeOut: true });
      this.authenticationService.login(this.f.userName.value).subscribe(response => {
        if (response) {
          // setTimeout(() => {
          this.toastrService.clear();
          this.toastrService.success('Logged in. Redirecting...', `Welcome back ${response.name}`);
          this.router.navigate(['/employeeList'], { replaceUrl: true });
          // }, 5000);
          // this.router.navigate(['/employeeList']);
        } else {
          this.toastrService.error('Authentication Error', 'Authentication Error');
          this.loading = false;
        }
      }, error => {
        this.toastrService.clear();
        this.toastrService.error('Authentication Error', JSON.stringify(error));
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  logout(): void {
    this.toastrService.warning('You have been logged out', 'Log out');
    localStorage.removeItem('credential');
  }
}
