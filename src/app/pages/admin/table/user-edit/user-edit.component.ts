import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { userData } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  editUserForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userData
  ) { }

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      first_name: [this.data.first_name, Validators.required],
      avatar: [this.data.avatar, Validators.required],
      email: [this.data.email, Validators.required],
      last_name: [this.data.last_name, Validators.required],
    });
  }

}
