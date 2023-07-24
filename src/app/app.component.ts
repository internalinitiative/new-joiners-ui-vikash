import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmailValidator, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogComponent } from './Edit/edit-dialog/edit-dialog.component';
// import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './models/employee';
import { EmployeeHr } from './models/employeeHr';
import { DataService } from './services/data.service';
import { AddDialogComponent } from './add/add.dialog.component';
import { MatChipInputEvent } from '@angular/material/chips';

export interface SearchItem {
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  activeLinkStyle = 'pointer';
  pageSizeOptions =[5,10,15];
  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Contact Number','Salary','View Details', 'Delete'];
  displayedColumnsHr: string[] = ['ID', 'Name', 'Email', 'Contact Number','Department','View Details', 'Delete']
  searchText: any;
  filterValues = {
    id:''
  };
  // @ViewChild('paginatorFirst')
  // paginatorFirst!: MatPaginator;

  // @ViewChild('paginatorhr')
  // paginatorhr!: MatPaginator;

  // @ViewChild('paginatorPageSize')
  // paginatorPageSize!: MatPaginator;

  // @ViewChild('paginatorPageSizeHr')
  // paginatorPageSizeHr!: MatPaginator;

  @ViewChild('paginatorFirst')
  paginatorFirst!: MatPaginator;
  @ViewChild('paginatorSecond')
  paginatorSecond!: MatPaginator;
  idFilter = new FormControl('');
  dataSource = new MatTableDataSource<Employee>(ELEMENT_DATA);
  dataSourceHR = new MatTableDataSource<EmployeeHr>(ELEMENT_DATA_HR);
  pageSizes = [3, 5, 7];
  // filterValues: any;
  
  // dataSourceWithPageSize = new MatTableDataSource<Employee>(ELEMENT_DATA);
  // dataSourceWithPageSizeHr = new MatTableDataSource<EmployeeHr>(ELEMENT_DATA_HR);

  constructor(public dialogService: MatDialog, public dataService: DataService){

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log('event', event);

    // Add our fruit
    if ((value || '').trim()) {
      this.searchItems.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(item: SearchItem): void {
    const index = this.searchItems.indexOf(item);

    if (index >= 0) {
      this.searchItems.splice(index, 1);
    }
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  searchItems: SearchItem[] = [];
  searchValue:string ='';
  applyFilter(filterValue:string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSourceHR.filter = filterValue;
  }
  ngOninit() {
    this.idFilter.valueChanges
    .subscribe(
      id => {
        this.filterValues.id=id || '{}';
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSourceHR.paginator = this.paginatorSecond;
    // this.dataSource.filterPredicate = this.createFilter();
    // this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
    // this.dataSourceHR.paginator = this.paginatorhr;
    // this.dataSourceWithPageSizeHr.paginator = this.paginatorPageSizeHr;
  }

  

  openAddDialog(empData:string) {
    let eData;
    if(empData=='emp'){
      eData= {'emp':{}}
    } else {
      eData= {'hr':{}}
    }
    const dialogRef = this.dialogService.open(AddDialogComponent, {
      data:eData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        debugger;
        if(empData=='hr'){
          this.dataSourceHR.data.push(this.dataService.getDialogData());
          this.dataSourceHR.paginator = this.paginatorSecond;
        } else {
          this.dataSource.data.push(this.dataService.getDialogData());
          this.dataSource.paginator = this.paginatorFirst;
        }
      }
    });
}
// by passing object open dialogue box


//deleteItem
deleteItem(removalId  : number,hr?:string) {
  debugger;
  if(hr){
    this.dataSourceHR.data.forEach((value,index)=>{
      if(value.id==removalId){
        this.dataSourceHR.data.splice(index,1)
      }
    });
    this.dataSourceHR.paginator = this.paginatorSecond;
  } else {
  this.dataSource.data.forEach((value,index)=>{
    if(value.id==removalId){
      this.dataSource.data.splice(index,1)
    }
  });
  this.dataSource.paginator = this.paginatorFirst;
}
}

// createFilter(): (data: any, filter: string) => boolean {
//   debugger;
//   let filterFunction = function(data:any, filter:string): boolean {
//     let searchTerms = JSON.parse(filter);
//     return data.name.toLowerCase().indexOf(searchTerms.name) !== -1;
//       // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
//       // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
//       // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
//   }
//   return filterFunction;
// }

startEdit(element: any ,hr?:string) {
  let id = element.id;
  let number = element.contactnumber;
  let name = element.name;
  let email = element.email;
// index row is used just for debugging proposes and can be removed
  console.log(id);
  let employeeDetails;
  // let hrDetails
  if(!hr) {
    employeeDetails={id: id, name: name, email: email, contactnumber: number};
  } else {
    employeeDetails={hr:{},id: id, name: name, email: email, contactnumber: number, Department: element.department, employeeList: element.EmployeeList};
  }
  const dialogRef = this.dialogService.open(EditDialogComponent, {
    data: employeeDetails
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      debugger;
      
      element= this.dataService.getDialogData();
      if(hr){
        
        this.dataSourceHR.data.forEach(val => {
          if(val.id == element.id){
            // val=element;
            val.name = element.name;
            val.email = element.email;
            val.contactnumber = element.contactnumber;
            val.department= element.department;
            // val.employeeList=element.employeeList;
          }
        });
      } else {
      this.dataSource.data.forEach(val => {
        if(val.id == element.id){
          // val=element;
          val.name = element.name;
          val.email = element.email;
          val.contactnumber = element.contactnumber;
        }
      });
    }
  }
})
};
}


const ELEMENT_DATA: Employee[] = [
  {id: 1000001, name: 'Vikas', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 2000002, name: 'Mahesh', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 3000003, name: 'Ramesh', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 4000004, name: 'Murugesh', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 5000005, name: 'Saha', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 6000006, name: 'Sami', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 7000007, name: 'Rami', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 8000008, name: 'Bhagi', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 9000009, name: 'Jame', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 10000001, name: 'Justin', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000},
  {id: 10000002, name: 'Magie', email: 'abc@gmail.com', contactnumber: 1234567890, salary: 10000}
];

const ELEMENT_DATA_HR: EmployeeHr[] = [
  {id: 1000001, name: 'Vikas', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 2000002, name: 'Mahesh', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 3000003, name: 'Ramesh', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 4000004, name: 'Murugesh', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 5000005, name: 'Saha', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 6000006, name: 'Sami', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 7000007, name: 'Rami', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 8000008, name: 'Bhagi', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 9000009, name: 'Jame', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 10000001, name: 'Justin', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"},
  {id: 10000002, name: 'Magie', email: 'abc@gmail.com', contactnumber: 1234567890,department:"HR"}
];