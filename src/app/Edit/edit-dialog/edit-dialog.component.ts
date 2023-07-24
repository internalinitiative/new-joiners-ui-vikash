import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  department:boolean;
  employeelist:boolean;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  public dataService: DataService
              ) { 
                if(this.data.hr) {
                  this.department= true;
                  this.employeelist= true;
                } else {
                  this.department= false;
                  this.employeelist= false;
                } 

              }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateEmployee(this.data);
  }
}
