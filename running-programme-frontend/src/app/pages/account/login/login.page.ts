import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { TokenDTO } from 'src/app/models/token/token.model';
import { UserDTO } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/user/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public get errorControl() {
    return this.loginForm.controls;
  }

  public navigateRegister(): void {
    this.router.navigate(['register']);
  }

  public login(): void {
    if (this.loginForm.valid) {
      const user: UserDTO = {
        email: '/',
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rating: 0,
      };

      this.authService
        .login(user)
        .pipe(take(1))
        .subscribe((tokens: TokenDTO) => {
          this.authService.saveTokens(tokens).then(() => {
            this.router.navigate(['']);
          });
        });
    }
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
