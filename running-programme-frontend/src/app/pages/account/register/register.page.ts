import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  public get errorControl() {
    return this.registerForm.controls;
  }

  public register(): void {}

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
