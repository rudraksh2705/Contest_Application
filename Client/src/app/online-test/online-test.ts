import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ContestService } from '../services/contest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Perfomance } from '../services/perfomance';

const check = (user: string[], correct: string[]): number => {
  let number = 0;
  for (let i = 0; i < user.length; i++) {
    if (user[i] === correct[i])
      number++;
  }
  return number;
}


@Component({
  selector: 'app-online-test',
  imports: [CommonModule, FormsModule],
  templateUrl: './online-test.html',
  styleUrl: './online-test.css',
})


export class OnlineTest {
  public correctAnswers: string[] = [];
  public total = 0;
  public problems: any = {};
  public String = String;
  public selectedAnswers: string[] = [];
  public user: any = {};
  constructor(private route: ActivatedRoute, private Router: Router, private api: ContestService, private cd: ChangeDetectorRef, private authApi: Auth, private PerfomanceApi: Perfomance) {

  }
  public handleSubmit() {
    alert(`${check(this.selectedAnswers, this.correctAnswers)} out of ${this.total}`);
    console.log(this.selectedAnswers);
    this.authApi.getUser().subscribe({
      next: (res: any) => {
        this.user = res.data._id;
        const id = this.route.snapshot.paramMap.get('id');
        const data = { contest: id, user: this.user, score: check(this.selectedAnswers, this.correctAnswers), total: this.total }
        console.log(data);
        this.PerfomanceApi.createPerfModel(data).subscribe({
          next: (res) => {
            console.log(res);
            this.Router.navigate(['/perfomance']);
          }, error: (err) => {
            alert(err);
          },
        });
      },
      error: (error) => {
        alert(error);
      },
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getContest(id).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.problems = res.data
        this.correctAnswers = this.problems.problems.map((arg: any) => {
          return arg.correct
        });
        this.total = this.correctAnswers.length;
        this.cd.detectChanges()
      },
      error: (error: any) => {
        alert(error);
      }
    });
  }
}
