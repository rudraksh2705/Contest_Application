import { ChangeDetectorRef, Component } from '@angular/core';
import { ContestService } from '../services/contest';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Perfomance } from '../services/perfomance';

@Component({
  selector: 'app-contests',
  imports: [FormsModule, CommonModule],
  templateUrl: './contests.html',
  styleUrl: './contests.css',
})
export class Contests {
  public contests: any[] = [];
  constructor(private api: ContestService, private cd: ChangeDetectorRef, private route: Router, private AuthApi: Auth, private perfomanceApi: Perfomance) {

  }
  public role: string = 'Participant';
  public hasAttempted: boolean = false;
  public UserId: string = "";

  ngOnInit() {
    this.api.getContests().subscribe({
      next: (res: any) => {
        this.contests = res.data
        console.log(res.data);
        this.cd.detectChanges();
      },
      error: (error) => {
        alert(error)
      }
    })
    this.AuthApi.getUser().subscribe({
      next: (res: any) => {
        this.UserId = res.data._id;
        this.role = res.data.role;
        this.cd.detectChanges();
      },
      error: (error) => {
        alert(error);
      }
    })
  }

  public handleAttempt(id: any) {
    console.log(id);
    console.log(this.role);
    if (this.role === 'admin') {
      this.route.navigate(['/perfomance'], {
        state: {
          id
        }
      });
    }
    else {
      this.perfomanceApi.canAttemptContest(this.UserId, id).subscribe({
        next: (res: any) => {
          console.log("Contest can be attempted");
          this.route.navigate([`/contest/${id}`]);
        },
        error: (error) => {
          alert(error);
        }
      })
    }
  }
}
