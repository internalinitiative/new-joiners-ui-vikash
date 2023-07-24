import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
// import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import { Employee } from '../models/employee';
import { DataService } from '../services/data.service';
// import {Issue} from '../../models/issue';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../add/add.dialog.component.html',
  styleUrls: ['../add/add.dialog.component.scss']
})

export class AddDialogComponent {
  department:boolean = false;
  employeelist:boolean = false;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailValid: boolean=false;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: DataService) {
                console.log(this.data);
                if(this.data.hr) {
                this.department= true;
                this.employeelist= true;
              } else {
                this.department= false;
                this.employeelist= false;
              } }
  ngOninit() {
    
  }
  checkMail() {
    if(this.data.email) {
      let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
      if(regex.test(this.data.email)){
        this.emailValid= false;
      } else {
        this.emailValid= true;
        // this.formControl.hasError('email');
      }
    }
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email
  ]);
  onKeyUp(event: any,fieldName:string) {
    if(fieldName=='salary') {
      this.data.salary= event.target.value.replace(/[^0-9]*/g, '');
    } else {
    this.data.contactnumber= event.target.value.replace(/[^0-9]*/g, '');
    }
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    // this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    debugger;
    if(this.data.hr) { 

      this.dataService.addEmployee(this.data)} 
    else{
      this.dataService.addEmployee(this.data)
    };
  }
}
