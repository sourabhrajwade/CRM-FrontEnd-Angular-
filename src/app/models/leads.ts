export interface Leads{

  fullname: string;
  email: string;
  mobile: string;
  city: string;
  gender: string ;
  department: string;
  status: string;
  priority: string;
  source: string;
  createdDate: Date | string;
  updatedDate: Date | string;
  isPermanent: boolean;
  desciption: string;
  companyname: string;
  assignedTo: string | number;
}
