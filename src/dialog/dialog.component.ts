import { CoreService } from './../core.service';
import { Component, Inject, inject } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators,FormGroup} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignmnentSService } from './../assignmnent-s.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  assForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assService: AssignmnentSService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private coreService: CoreService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    // private _coreService: CoreService
  ) {
    this.assForm = this.fb.group({
      assignmentName: '',
      class: '',
      type: '',
      url: '',
      dueDate: '',
    });
  }

  class: string[] = [
    'government',
    'study hall',
    'English',
    'Math',
    'culinary',
    'finance',
    'science',
    'silcorski',
  ];

  type: string[] = [
    'quizlet',
    'quiz',
    'test',
    'worksheet',
    'notes',
    'vocab',
    'project',
    'edulastic',
  ];

  onadd() {
    if (this.assForm.valid) {
      this.assService.addassignment(this.assForm.value).subscribe({
        next: (val: any) =>{
          alert('assignement added');
          this.dialogRef.close()
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
    else {
      this.assService.addassignment(this.assForm.value).subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Employee added successfully');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}