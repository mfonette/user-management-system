import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';
import { userData } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from './user-create/user-create.component';  
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  allUsers: userData[] = []; // Store all users fetched from the server
  dataSource: any;
  displayedColumns = ['id', 'email', 'first_name', 'last_name', 'avatar', 'actions']; 

  constructor(private userService: UserService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef ) {
   
  }
  ngOnInit(): void {
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
  this.paginator.page.subscribe(() => {
    this.updateTableData();
  });
  }

  fetchUsers() {
    this.userService.listAllUsers().subscribe({
      next: (response) => {
        this.allUsers = response;
        this.dataSource = new MatTableDataSource<userData>(this.allUsers)
        this.updateTableData();
        this.changeDetectorRef.detectChanges(); // Ensure changes are detected
      },
      error: (error) => console.error('Failed to fetch users:', error),
    });
  }
  
  updateTableData(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = Math.min(startIndex + this.paginator.pageSize, this.allUsers.length);
    this.dataSource.data = this.allUsers.slice(startIndex, endIndex);
    this.paginator.length = this.allUsers.length; 

  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, { width: '250px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allUsers.push(result); // Simulate adding the user
        this.updateTableData(); 
      }
    });
  }
  

  openEditDialog(selectedUser: userData) {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '250px',
      data: selectedUser // Pass the current user data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.allUsers.findIndex(user => user.email === selectedUser.email); // Identify user by a unique attribute
        if (index !== -1) {
          this.allUsers[index] = result; // Update the local data source
          this.updateTableData(); // Refresh the table to reflect changes
        
        }
      }
    });
  }

  openDeleteDialog(selectedUser: userData) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '300px',
      data: {user: selectedUser}// Pass the current user for confirmation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(selectedUser);
      }
    });
  }

  deleteUser(userToDelete: userData) {
    const index = this.allUsers.findIndex(user => user.email === userToDelete.email); // Assuming each user has a unique `id`
    if (index !== -1) {
      this.allUsers.splice(index, 1); // Remove the user
      this.updateTableData(); // Update the displayed data
    }
  }
  
}
