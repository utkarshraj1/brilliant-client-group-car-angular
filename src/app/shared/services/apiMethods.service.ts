import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesDetails } from '../types/SalesDetails';
import { environment } from 'src/environments/environment';
import { api_endpoint } from '../static/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ApiMethodsService {
  constructor(private http: HttpClient) {}

  addSalesDetails(salesDetailsObj: SalesDetails): Observable<any> {
    return this.http.post(
      `${environment.url}${api_endpoint.add_sales_details}`,
      salesDetailsObj
    );
  }

  queryListOfSalesDetails(id: number, offset: number): Observable<any> {
    const params = new HttpParams().set('offset', offset);
    return this.http.get(
      `${environment.url}${api_endpoint.search_results}/${id}`,
      {
        params,
      }
    );
  }

  getSalesDetails(salesId: number, customerId: number): Observable<any> {
    return this.http.get(
      `${environment.url}${api_endpoint.sales_details}/${salesId}/${customerId}`
    );
  }

  updateSalesDetails(salesDetailsObj: any, salesId: number): Observable<any> {
    return this.http.patch(
      `${environment.url}${api_endpoint.edit_details}/${salesId}`,
      salesDetailsObj
    );
  }
}
