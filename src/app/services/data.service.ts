import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/Employees';

  dataChange: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor() {}

  get data(): Employee[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
//   getAllEmployees(): void {
//     this.httpClient.get<Employee[]>(this.API_URL).subscribe(data => {
//         this.dataChange.next(data);
//       },
//       (error: HttpErrorResponse) => {
//       console.log (error.name + ' ' + error.message);
//       });
//   }

  // DEMO ONLY, you can find working methods below
  addEmployee(Employee: Employee): void {
    this.dialogData = Employee;
    
  }

  updateEmployee(Employee: Employee): void {
    this.dialogData = Employee;
  }

  deleteEmployee(id: number): void {
    console.log(id);
  }
}



/* REAL LIFE CRUD Methods I've used in projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




