import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import{DatabaseProvider} from  '../../providers/database/database'
/**
 * Generated class for the AddDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  name:string="";
  phone:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast:Toast,public database:DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDataPage');
  }
  saveData()
  {
    if(this.name!="" && this.phone!="")
    {
      this.database.createUser(this.name,this.phone).then((data)=>{
        console.log(data);
        this.toast.show('New User Created','5000','center').subscribe(toast=>{this.navCtrl.popToRoot();})
     },(error)=>
       this.toast.show(error,"5000","center").subscribe(toast=>{console.log(toast)})
     );
    }
    else
    {
      this.toast.show("Please fill all data ","5000","center").subscribe(toast=>{console.log(toast)})
    }
  }



}
