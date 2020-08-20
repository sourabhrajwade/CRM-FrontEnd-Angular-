import { Leads } from './../models/leads';
import { map } from 'rxjs/operators';
import { Contact } from './../models/contact';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CRMSummary } from './../models/crmsummary';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrmService {
  data = [
    {
      title: 'Leads',
      value: 300,
      textValue: 20,
      color: 'red',
      percentValue: 32,
      isIncrease: true,
      isCurrency: true,
      icon: 'post_add',
    },
    {
      title: 'Contacts',
      value: 300,
      textValue: 20,
      color: 'red',
      percentValue: 32,
      isIncrease: true,
      isCurrency: true,
      icon: 'contacts',
    },
    {
      title: 'Service',
      value: 300,
      textValue: 20,
      color: 'red',
      percentValue: 32,
      isIncrease: true,
      isCurrency: true,
      icon: 'cleaning_services',
    },
    {
      title: 'Total',
      value: 300,
      textValue: 20,
      color: 'green',
      percentValue: 32,
      isIncrease: false,
      isCurrency: false,
      icon: 'polymer',
    },
  ];
  Crmsummary: CRMSummary;
  services: any[];
  public leads: Leads[] = [];
  private leadCRM;
  public leadObs;
  serviceCount: number;
  public contactArr: any;
  serviceCRM: BehaviorSubject<CRMSummary[]>;
  crm: Observable<CRMSummary[]>;
  constructor(private http: HttpClient) {
    this.serviceCRM = new BehaviorSubject<CRMSummary[]>(this.data);
    this.crm = this.serviceCRM.asObservable();
    this.leadCRM = new BehaviorSubject<any>(this.leads);
    this.leadObs = this.leadCRM.asObservable();
  }

  getSummary() {
    let leads: any;
    this.getLeadsCount().subscribe((result) => {
      leads = result;
      console.log(leads);
    }
    );
    return this.crm;

  }
  getServiceCount() {
    return this.http
      .get(`${environment.URL}/services/all`)
      .subscribe((result) => {
        this.services.push(result);
      });
  }
  getContact() {
    return this.http.get(`${environment.URL}/contacts/all`);
  }
  getLeadsCount() {
    return this.http.get(`${environment.URL}/leads/view`);
  }
  createContact(data: Contact) {
    return this.http.post(`${environment.URL}/contacts/create`, data);
  }
  createLead(data: Leads) {
    return this.http.post(`${environment.URL}/leads/create`, data);
  }
  createService(data: Leads) {
    return this.http.post(`${environment.URL}/services/create`, data);
  }
  updateLeads(data) {
    return this.http.patch(`${environment.URL}/leads/update`, data);
  }
  deleteLead(data) {
    return this.http.patch(`${environment.URL}/leads/delete`, data);
  }

}
