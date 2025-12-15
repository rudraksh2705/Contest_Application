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

  ngOnInit() {
    console.log("entered");
    this.AuthApi.getUser().subscribe({
      next: (res: any) => {
        const id = res.data._id;
        if (res.data.role === 'admin') {
          this.api.viewAllPerfomance().subscribe({
            next: (res: any) => {
              this.perfomances = res.data;
              console.log(this.perfomances);
              this.cd.detectChanges();
            },
            error: (error) => {
              this.errorMessage = error;
            }
          })
        }
        else {
          this.api.getPerfomance(id).subscribe({
            next: (res: any) => {
              this.perfomances = res.data;
              console.log(this.perfomances);
              this.cd.detectChanges();
            },
            error: (error) => {
              this.errorMessage = error;
            }
          })
        }
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}
