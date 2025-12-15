import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContestService } from '../services/contest';


@Component({
  selector: 'app-contest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contest.html',
  styleUrls: ['./contest.css'],
})
export class ContestForm {
  submitted = false;
  selectedFile: File | null = null;

  constructor(private api: ContestService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  handleSubmit(form: any) {
    this.submitted = true;

    if (!form.valid || !this.selectedFile) {
      alert("Fill the Details Properly");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("description", form.value.description);
    formData.append("file", this.selectedFile);

    this.api.createContest(formData).subscribe({
      next: (res) => {
        console.log("Contest created:", res);
        alert("Contest created successfully!");
        this.submitted = false;
        form.resetForm();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error(err);
        alert("Error creating contest");
      }
    });
  }
}
