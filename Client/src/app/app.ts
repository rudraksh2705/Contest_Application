import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private Router: Router, private api: Auth, private cd: ChangeDetectorRef) {

  }

  public logout() {
    if (this.user) {
      this.api.logOutUser().subscribe({
        next: (res) => {
          this.user = null;
          alert("Logged Out");
          this.Router.navigate(["/login"]);
          this.cd.detectChanges();
        },
        error: (error) => {
          alert(error);
        }
      })
    }
  }

  public user: any = {};
  ngOnInit() {
    this.api.getUser().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.user = res.data
        alert("User is logged in");
        this.cd.detectChanges();
        if (this.user.role !== 'admin') {
          this.Router.navigate(['/contest'])
        }
        else {
          this.Router.navigate(['/admin-dashboard']);
        }
      },
      error: (error) => {
        alert(error);
        this.user = null;
        this.Router.navigate(['/login']);
        this.cd.detectChanges();
      }
    })
    //
  }
}
