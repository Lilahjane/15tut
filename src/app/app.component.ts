import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { AssignmnentSService } from '../assignmnent-s.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from '../core.service';


export interface MatTableDataSource {
    assignmentName: 'string',
    class: 'string',
    type: 'string',
    url: 'string',
    dueDate: 'string',
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule, 
    MatButtonModule,
    MatIconModule,
    DialogComponent,
    MatInputModule,
    MatFormFieldModule,
    MatPaginator,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  displayedColumns: string[] = [
    'assignmentName' ,
    'class',
    'type',
    'url',
    'dueDate'
  ];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private assService: AssignmnentSService,
    private coreService: CoreService
  ){}

  ngOnInit(): void {
    this.getassignmentlist();
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getassignmentlist() {
    this.assService.getassignmentlist().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error, // Handle errors appropriately
    });
  }
  


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

deleteassignment(id: number) {
  this.assService.deleteassignment(id).subscribe({
    next: (res) => {
      this.coreService.openSnackBar('Employee deleted!', 'done');
      this.getassignmentlist();
    },
    error: console.log,
  });
}

openEditForm(data: any) {
  const dialogRef = this.dialog.open(DialogComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getassignmentlist();
      }
    },
  });
}
}
