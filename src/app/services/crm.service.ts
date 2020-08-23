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
      value: 0,
      textValue: 20,
      color: 'red',
      percentValue: 32,
      isIncrease: true,
      isCurrency: false,
      icon: 'post_add',
      status: {
        new: 0,
        contacted: 0,
        qualified: 0,
        lost: 0,
        cancelled: 0,
        confirmed: 0,
      },
    },
    {
      title: 'Contacts',
      value: 0,
      textValue: 20,
      color: 'red',
      percentValue: 32,
      isIncrease: true,
      isCurrency: false,
      icon: 'contacts',
    },
    {
      title: 'Service',
      value: 0,
      textValue: 20,
      color: 'red',
      percentValue: 32,
      isIncrease: true,
      isCurrency: false,
      icon: 'cleaning_services',
      status: {
        created: 0,
        open: 0,
        released: 0,
        cancelled: 0,
        in_process: 0,
        completed: 0,
      },
    },
    {
      title: 'Total',
      value: 0,
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
    let leadsLen = 0;
    let serviceLen = 0;
    let contactLen = 0;
    this.getLeadsCount().subscribe((result) => {
      leadsLen = result['leads'].length;
      result['leads'].forEach((l) => {
        if (l.status === 'new') {
          this.data[0].status.new++;
        }
        if (l.status === 'contacted') {
          this.data[0].status.contacted++;
        }
        if (l.status === 'qualified') {
          this.data[0].status.qualified++;
        }
        if (l.status === 'lost') {
          this.data[0].status.lost++;
        }
        if (l.status === 'cancelled') {
          this.data[0].status.cancelled++;
        }
        if (l.status === 'confirmed') {
          this.data[0].status.confirmed++;
        }
      });
      this.data[0].value = leadsLen;
    });
    this.getServices().subscribe((result) => {
      serviceLen = result['services'].length;

      result['services'].forEach((s) => {
        if (s.status === 'created') {
          this.data[2].status.created++;
        }
        if (s.status === 'open') {
          this.data[2].status.open++;
        }
        if (s.status === 'released') {
          this.data[2].status.released++;
        }
        if (s.status === 'cancelled') {
          this.data[2].status.cancelled++;
        }
        if (s.status === 'in_process') {
          this.data[2].status.in_process++;
        }
        if (s.status === 'completed') {
          this.data[2].status.completed++;
        }
      });
      this.data[2].value = serviceLen;
    });
    this.getContact().subscribe((result) => {
      contactLen = result['contacts'].length;

      this.data[1].value = contactLen;
      this.data[3].value = contactLen + serviceLen + leadsLen;
    });

    return this.crm;
  }
  getServices() {
    return this.http.get(`${environment.URL}/services/all`);
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
  createService(data) {
    return this.http.post(`${environment.URL}/services/create`, data);
  }
  updateLeads(data) {
    return this.http.patch(`${environment.URL}/leads/update`, data);
  }
  deleteLead(data) {
    return this.http.patch(`${environment.URL}/leads/delete`, data);
  }
  updateContact(data: Contact) {
    return this.http.patch(`${environment.URL}/contacts/update`, data);
  }
  updateService(data: Leads) {
    return this.http.put(`${environment.URL}/services/update`, data);
  }
  getallusers() {
    return this.http.get(`${environment.URL}/admin/getall`);
  }
}
