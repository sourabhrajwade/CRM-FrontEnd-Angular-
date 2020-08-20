import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class SalesService {
  salesData = [
    { month: 'January', revenue: 35763 },
    { month: 'February', revenue: 29456 },
    { month: 'March', revenue: 50782 },
    { month: 'April', revenue: 51913 },
    { month: 'May', revenue: 26283 },
    { month: 'June', revenue: 25478 },
    { month: 'July', revenue: 10293 },
    { month: 'August', revenue: 26090 },
    { month: 'September', revenue: 43892 },
    { month: 'October', revenue: 20487 },
    { month: 'November', revenue: 45721 },
    { month: 'December', revenue: 55093 },
  ];


  constructor(private http: HttpClient) {}

  getSalesByMonth() {
    console.log(this.salesData);
    return this.salesData;
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(`An error occurred: ${err}`);
  }
}
