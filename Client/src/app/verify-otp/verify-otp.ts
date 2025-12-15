import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  imports: [FormsModule, CommonModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {
  public submitted = false;
  public otp: string = "";
  public errorMsg: string = "";
  constructor(private api: Auth, private route: Router) {

  }

  public handleSubmitOtp(form: any) {
    this.submitted = true;
    if (!form.valid) {
      alert("Fill the otp correctly");
      return;
    }
    this.api.verifyOtp({ otp: form.value.otp, email: history.state.email }).subscribe({
      next: (res) => {
        alert("User logged in and verified");
        this.route.navigate(['/contest']);
      },
      error: (error) => {
        this.errorMsg = error;
        alert(this.errorMsg)
      }
    });
  }
}
