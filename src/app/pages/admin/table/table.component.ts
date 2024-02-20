import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';
import { User, userData } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from './user-create/user-create.component';  

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  allUsers: userData[] = []; // Store all users fetched from the server
  dataSource: MatTableDataSource<userData>;
  displayedColumns = ['id', 'email', 'first_name', 'last_name', 'avatar', 'actions']; // Adjust based on your data

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef ) {
      this.dataSource = new MatTableDataSource<userData>([]);
   
  }
  ngOnInit(): void {
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    // (window as any).paginator = this.paginator;
    this.dataSource.paginator = this.paginator;
  this.paginator.page.subscribe(() => {
    this.updateTableData();
  });
  }

  fetchUsers() {
    this.userService.listAllUsers().subscribe({
      next: (response) => {
        this.allUsers = response;
        this.paginator.length = this.allUsers.length;
        this.updateTableData();
        this.changeDetectorRef.detectChanges(); // Ensure changes are detected
      },
      error: (error) => console.error('Failed to fetch users:', error),
    });
  }
  
  updateTableData(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.dataSource.data = this.allUsers.slice(startIndex, endIndex);
  }

  
}
