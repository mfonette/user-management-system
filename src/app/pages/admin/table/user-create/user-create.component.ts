import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
              private fb: FormBuilder,
              private userService: UserService,
              public dialogRef: MatDialogRef<UserCreateComponent> ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      avatar: ['', Validators.required],
      email: ['', Validators.required],
      last_name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close(response); // Close the dialog on success
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      });
    }
  }

}
