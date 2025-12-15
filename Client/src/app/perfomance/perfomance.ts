import { ChangeDetectorRef, Component } from '@angular/core';
import { Perfomance } from '../services/perfomance';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';



export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Contest {
  _id: string;
  name: string;
}

export interface PerfomanceInterface {
  _id: string;
  user: User;
  contest: Contest;
  score: number;
  rank: number;
}


@Component({
  standalone: true,
  selector: 'app-perfomance',
  imports: [CommonModule],
  templateUrl: './perfomance.html',
  styleUrl: './perfomance.css',
})

export class PerfomanceComp {
  constructor(private api: Perfomance, private cd: ChangeDetectorRef, private AuthApi: Auth) {

  }
  public perfomances: PerfomanceInterface[] = [];
  public errorMessage = "";

  public getPerfomanceDataContest(contestId: string) {
    this.api.getContestPerfomance(contestId).subscribe({
      next: (res: any) => {
        this.perfomances = res.data;
        this.cd.detectChanges();
      },
      error: (error: any) => {
        this.errorMessage = error;
      }
    })
  }

  public getPerfomanceDataUser(userId: string) {
    this.api.getUserPerfomance(userId).subscribe({
      next: (res: any) => {
        this.perfomances = res.data;
        console.log(res.data);
        this.cd.detectChanges();
      },
      error: (error: any) => {
        this.errorMessage = error;
      }
    })
  }

  ngOnInit() {
    this.AuthApi.getUser().subscribe({
      next: (res: any) => {
        const UserId = res.data._id;
        if (res.data.role === 'admin') {
          const id = history.state.id;
          console.log(id);
          if (id)
            this.getPerfomanceDataContest(id);
          else
            this.api.viewAllPerfomance().subscribe({
              next: (res: any) => {
                this.perfomances = res.data;
                this.cd.detectChanges();
                console.log(res.data);
              },
              error: (error) => {
                this.errorMessage = error;
                this.cd.detectChanges();
              }
            })
          this.cd.detectChanges();
        }
        else {
          console.log(UserId);
          this.getPerfomanceDataUser(UserId);
          this.cd.detectChanges();
        }
      },
      error: (error: any) => {
        this.errorMessage = error;
        alert(error);
      }
    })
  }
}
