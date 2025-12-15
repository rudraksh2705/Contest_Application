import { ChangeDetectorRef, Component } from '@angular/core';
import { ContestService } from '../services/contest';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contests',
  imports: [FormsModule, CommonModule],
  templateUrl: './contests.html',
  styleUrl: './contests.css',
})
export class Contests {
  public contests: any[] = [];
  constructor(private api: ContestService, private cd: ChangeDetectorRef, private route: Router) {

  }
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
  }

  public handleAttempt(id: any) {
    console.log(id);
    this.route.navigate([`/contest/${id}`]);
  }
}
