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
  public experiments:any

  constructor(private afs:AngularFirestore) {
    console.log('Hello DatabaseProvider Provider');
    // setup subscriber to return current experiments values on request
    afs.collection('Experiments').valueChanges().subscribe(e=>this.experiments=e)
  }

  getFarmers(){
    return this.afs.collection('Farmers').valueChanges()
  }

  getFarmerExperiments(farmerKey){
    return this.afs.collection('Farmers').doc(farmerKey).collection('Experiments').valueChanges()
  }

  getCollection(collectionID){
    // return observer for collection documents
    return this.afs.collection(collectionID).valueChanges();
  }
  getSubCollection(collectionID1,docID,collectionID2){
    // return observer for subcollection documents
    return this.afs.collection(collectionID1).doc(docID).collection(collectionID2).valueChanges();
  }

  addFarmer(data){
    const key = this.afs.createId();
    data._key=key
    return this.afs.collection('Farmers').doc(key).set(data)
  }
  enrolFarmerInExperiment(farmerKey,experimentKey){
    console.log('enrolling',farmerKey,experimentKey)
    // updates farmer and experiment 
    let batch = this.afs.firestore.batch();
    let fRef=this.afs.firestore.collection('Farmers').doc(farmerKey).collection('Experiments').doc(experimentKey);
    batch.set(fRef,{
      _key:experimentKey,
      enrolled:new Date()
    })
    let eRef= this.afs.firestore.collection('Experiments').doc(experimentKey).collection('Farmers').doc(farmerKey)
    batch.set(eRef,{
      _key:farmerKey,
      enrolled:new Date()
    });

    batch.commit()
    .then(_=>console.log('successfully updated'))
    .catch(err=>console.log('err',err))
  }


}
