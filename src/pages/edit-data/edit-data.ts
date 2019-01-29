import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import {DatabaseProvider} from  '../../providers/database/database'
/**
 * Generated class for the EditDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {
  user={id:0,Name:"",Phone:""}
  editid:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public database:DatabaseProvider, private toast:Toast) {
    this.editid=this.navParams.get("rowid");
    this.getCurrentData(this.editid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDataPage');
  }

  getCurrentData(rowid)
  {
      this.database.getUserbyId(rowid).then((data:any)=>{
        console.log(data);
        this.user=data;
      },(error)=>console.log(error))

  }
  updateData()
   {
      if(this.user.Name!="" && this.user.Phone!=="")
      {
        this.database.updateUser(this.user.id,this.user.Name,this.user.Phone).then((data)=>{
          console.log("Updated",data);
          this.toast.show("Data Updated","5000","center").subscribe(toast=>{this.navCtrl.popToRoot()});
        },
        (error)=>this.toast.show(error,"5000","center").subscribe(toast=>{console.log(toast)})
      )
      }
      else
      {
        this.toast.show("Please fill all data ","5000","center").subscribe(toast=>{console.log(toast)})
      }
    
  }


}
