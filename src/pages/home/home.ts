import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{DatabaseProvider} from  '../../providers/database/database'
import {AddDataPage} from '../add-data/add-data';
import {EditDataPage} from '../edit-data/edit-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name:string="";
  phone:string="";
  delid:string="";
  users:any=[];
  constructor(public navCtrl: NavController,private database:DatabaseProvider) {
    this.getUsers();
    console.log("Users",this.users.length)
  }
  ngOnInit() {
    this.getUsers();
    console.log("Users",this.users.length)
  }
  ionViewDidEnter()
  {
    this.getUsers();
  }

  getUsers()
  {
    this.database.getAllUsers().then((data:any)=>{
      console.log(data);
        this.users=data;  
        console.log("Data",data);
     },(error)=>console.log(error))
  }

  addData()
  {
    this.navCtrl.push(AddDataPage);
  }

  editData(rowid)
  {
    this.navCtrl.push(EditDataPage,{ rowid:rowid});
  }
  
  deleteUser(rowid)
  {
    if(rowid!="")
    {
      this.database.deleteUser(rowid).then((data)=>{
        console.log("Delete:",rowid)
        console.log(data);
        this.getUsers();
       },(error)=>{console.log(error)}
     )
    }
    else
    {
     console.log("Enter id")
    }
  }
  

}
