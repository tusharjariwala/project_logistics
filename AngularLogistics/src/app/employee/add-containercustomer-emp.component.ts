import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { insertresponse } from '../models/insertresponse';
import { showcontainercustomerdata } from '../models/showcontainercustomerdata';
import { showcontainercustomeridrespone } from '../models/showcontainercustomeridrespone';
import { showcontainerdata } from '../models/showcontainerdata';
import { showcontainerresponse } from '../models/showcontainerresponse';
import { showcustomerdata } from '../models/showcustomerdata';
import { showcustomerresponse } from '../models/showcustomerresponse';
import { restapiemployee } from '../services/restapiserviceemployee';

@Component({
  selector: 'app-add-containercustomer-emp',
  templateUrl: './add-containercustomer-emp.component.html',
  encapsulation:ViewEncapsulation.None,
})
export class AddContainercustomerEmpComponent implements OnInit {
  @ViewChild('f') slForm:NgForm | undefined;
  editMode=false;
  containercustomerRespone:showcontainercustomeridrespone|undefined;
  insertRespone!:insertresponse;

  listrespone!:showcontainerresponse;
  containerlist!:showcontainerdata[];

  customerrespone!:showcustomerresponse;
  customerlist!:showcustomerdata[];

  containercustomerlist!:showcontainercustomerdata[];
  containercustomerData:showcontainercustomerdata={
    container_customerid_pk: 0,
    container_id_fk: 0,
    container_name: "",
    container_number: "",
    delivery_days: "",
    departed_date: "",
    customer_id_fk: 0,
    customer_name: "",
    company_name: "",
    company_contact: "",
    phonenumber: "",
    no_of_parcels: "",
    added_by:0,
};
container_customerid_pk=0;
  constructor(private service:restapiemployee,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.containercustomerData.container_id_fk=params['id'];
    });
    this.ContainerList();
    this.CustomerList();
   
    // if(this.container_customerid_pk==0||this.container_customerid_pk==undefined)
    // {
    //   this.containercustomerData=new showcontainercustomerdata();
    // }
    // else{
    //   console.log();
    //   this.ContainerCustomerData();
    // }
  }
  ContainerList()
  {
    this.service.ContainerList()
    .subscribe(res=>{
      this.listrespone = res as showcontainerresponse;
      this.containerlist = this.listrespone.data;
      //this.Warehouseslist=this.listresponse.data;
    },err=>{
      console.log(err);
    })
  }
  CustomerList()
  {
    this.service.CustomerList()
    .subscribe(res=>{
      this.customerrespone = res as showcustomerresponse;
      this.customerlist = this.customerrespone.data;
      //this.Warehouseslist=this.listresponse.data;
    },err=>{
      console.log(err);
    })
  }
 
  
  ContainerCustomerData(){
    console.log("ContainerCustomer ID:"+this.container_customerid_pk);
    this.service.ContainerCustomerData(this.container_customerid_pk).subscribe(res=>{
      this.containercustomerRespone=res as showcontainercustomeridrespone;
      this.containercustomerData=this.containercustomerRespone.data;
    },err=>{
      console.log(err);
    });
  }
  compareFn(c1:any,c2:any):boolean
  {
   return c1 &&c2 ?c1.id ===c2.id: c1===c2;
  }
  customercompareFn(c1:any,c2:any):boolean
  {
   return c1 &&c2 ?c1.id ===c2.id: c1===c2;
  }

  onSubmit(form:NgForm)
  { 
    console.log("container customer   ID:"+this.container_customerid_pk);
    // if(this.container_customerid_pk== 0||this.container_customerid_pk==undefined)
    // {
    //   this.AddContainerCustomer(form);
    // }
    // else{
    //   this.UpdateContainerCustomer(form);
    // }
    this.AddContainerCustomer(form);
  }
  AddContainerCustomer(form:NgForm)
  {
    // console.log("Vehicle Data");
    // console.log(this.vehicleData);
    this.containercustomerData.added_by=1;
    this.service.AddContainerCustomer(this.containercustomerData).subscribe(res=>{
      this.insertRespone=res as insertresponse;
      if(this.insertRespone.result=="success")
      {
        this.resetForm(form);
        this.router.navigate(['/employee/show-container-emp'],{relativeTo:this.route});
      }
      else{
        console.log(res);
      }

    },err=>{
      console.log(err);
    });
  }
  UpdateContainerCustomer(form:NgForm)
  {
    this.service.UpdateContainerCustomer(this.containercustomerData).subscribe(res=>{
      this.insertRespone=res as insertresponse;
      if(this.insertRespone.result=="success")
      {
        this.resetForm(form);
        this.router.navigate(['/employee/show-containercustomer-emp'],{relativeTo:this.route});
      }
      else{
        console.log(res);
      }

    },err=>{
      console.log(err);
    });
  }
  resetForm(form:NgForm)
  {
    form.form.reset();
    this.containercustomerData=new showcontainercustomerdata();
  }
  onClear()
  {
    this.slForm?.reset();
    this.editMode=false;
  }

}
