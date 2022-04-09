import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators';
import { TokenDTO } from 'src/app/models/token/token.model';
import { UserDTO } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/user/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public get errorControl() {
    return this.registerForm.controls;
  }

  public navigateLogin(): void {
    this.router.navigate(['login']);
  }

  public register(): void {
    if (
      this.registerForm.get('repeat').value !==
      this.registerForm.get('password').value
    ) {
      return;
    }

    if (this.registerForm.valid) {
      const user: UserDTO = {
        email: this.registerForm.get('email').value,
        username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value,
        rating: 0,
      };

      this.authService
        .register(user)
        .pipe(
          take(1),
          mergeMap(() => this.authService.login(user)),
          catchError((error) => throwError(error))
        )
        .pipe(take(1))
        .subscribe(async (tokens: TokenDTO) => {
          await this.authService.saveTokens(tokens);

          this.router.navigate(['']);
        });
    }
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9-_]+$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeat: ['', [Validators.required]],
    });
  }
}
