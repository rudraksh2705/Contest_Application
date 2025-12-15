import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public submitted = false;

  public errorMsg: string = "";

  constructor(private api: Auth, private route: Router) {

  }
  public requestOtp(form: any) {
    this.submitted = true;
    if (!form.value.name || !form.value.email || !form.value.password) {
      alert("Please enter email , password and name");
      return;
    }

    if (!form.valid) {
      alert("Register correctly");
      return;
    }
    this.api.registerUser(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.route.navigate(['/verifyOtp'], {
          state: {
            email: form.value.email
          }
        });
      },
      error: (error) => {
        this.errorMsg = error;
        alert(this.errorMsg);
        return;
      }
    });

  }
}
