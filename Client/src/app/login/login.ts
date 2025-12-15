import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public LoginData: {
    email: string,
    password: string
  } = { email: "", password: "" }
  public submitted = false;
  public errorMsg: string = "";

  constructor(private api: Auth, private route: Router) {

  }
  public handleLogin(form: any) {
    this.submitted = true;
    if (!form.valid) {
      alert("Login Form is not valid");
      return;
    }
    this.api.login(form.value).subscribe({
      next: (res) => {
        alert("User logged In");
        this.route.navigate(['/contest']);
      },
      error: (error) => {
        console.log("error");
        this.errorMsg = error;
        alert(error)
      }
    })
  }
}
