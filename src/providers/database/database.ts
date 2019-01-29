import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private db:SQLiteObject;
  private isOpen:boolean;


  constructor(public http: Http, public storage:SQLite) {

    console.log('Hello DatabaseProvider Provider');
       if(!this.isOpen)
       {
         this.storage=new SQLite();
         this.storage.create({name:"data2.db",location:"default"}).then((db:SQLiteObject)=>{

             this.db=db;
             db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT,Phone TEXT)",[]);
             this.isOpen=true;

         }).catch((error)=>console.log("Databaseerror",error));
       }


  }
  
  createUser(name:string,phone:string)
  {
    return new Promise((resolve,reject)=>{

      let query="INSERT INTO users (Name,Phone) VALUES (?,?)";
      this.db.executeSql(query,[name,phone])
             .then((data)=>{
               //console.log("Data",data);
               resolve(data);
             },(error)=>{reject(error)}
            );
      });
  }
  
  getAllUsers()
  {
    return new Promise((resolve,reject)=>{
       let query="SELECT * FROM users";
       this.db.executeSql(query,[])
              .then((data)=>{
               let users=[];
               for(var i=0;i<data.rows.length;i++)
               {
                 users.push({
                  id:data.rows.item(i).id,
                  Name:data.rows.item(i).Name,
                  Phone:data.rows.item(i).Phone

                 });
               }
              resolve(users);

              },(error)=>{
                reject(error)
              });
    });
  }

   getUserbyId(id)
   {
     return new Promise((resolve,reject)=>{

        let query="SELECT * FROM users WHERE id=?";
        this.db.executeSql(query,[id]).then((data)=>{
          let user={id:0,Name:"",Phone:""}
          if(data.rows.length>0)
          {
            user.id=data.rows.item(0).id,
            user.Name=data.rows.item(0).Name,
            user.Phone=data.rows.item(0).Phone
          }
           
          resolve(user);

        },(error)=>{
          reject(error)
        })

     })
   }

  updateUser(id,name,phone)
  {
    return new Promise((resolve,reject)=>{

      let query="Update users SET Name=?,Phone=? Where id=?";
      this.db.executeSql(query,[name,phone,id])
      .then((data)=>{
        resolve(data)
      },(error)=>{reject(error)}
    );
    })
  }
  deleteUser(id)
  {
    return new Promise((resolve,rekject)=>{
         let query="DELETE FROM users where id=?";
           this.db.executeSql(query,[id])
                  .then((data)=>{
                    resolve(data)
                  },(error)=>{resolve(error)}
                )
    })
  }

}
