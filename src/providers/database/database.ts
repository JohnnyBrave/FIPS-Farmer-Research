import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
// auth
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection  } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseProvider {

  private obsDoc: AngularFirestoreDocument<any>;
  private obsCollection:AngularFirestoreCollection<any>
  private farmersCollection:AngularFirestoreCollection<any>

  constructor(private afs:AngularFirestore) {
    console.log('Hello DatabaseProvider Provider');
    this.farmersCollection=afs.collection('Farmers')
  }

  getFarmers(){
    return this.afs.collection('Farmers').valueChanges()
  }
  getExperiments(){
    return this.afs.collection('Experiments').valueChanges()
  }

  addFarmer(data){
    const id = this.afs.createId();
    data._id=id
    return this.afs.collection('Farmers').doc(id).set(data)
  }

}
