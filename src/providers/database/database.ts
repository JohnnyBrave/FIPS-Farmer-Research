import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
// auth
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseProvider {

  private obsDoc: AngularFirestoreDocument<any>;
  private obsCollection: AngularFirestoreCollection<any>
  public experiments: any

  constructor(private afs: AngularFirestore) {
    console.log('Hello DatabaseProvider Provider');
    // setup subscriber to return current experiments values on request
    afs.collection('Experiments').valueChanges().subscribe(e => this.experiments = e)
  }

  getFarmers() {
    return this.afs.collection('Farmers').valueChanges()
  }

  getFarmerExperiments(farmerKey) {
    return this.afs.collection('Farmers').doc(farmerKey).collection('Experiments').valueChanges()
  }

  getCollection(collectionID) {
    // return observer for collection documents
    return this.afs.collection(collectionID).valueChanges();
  }
  getDoc(collectionID, docID, subcollectionID?, subcollectionDoc?) {
    if(subcollectionDoc){
      return this.afs.firestore.collection(collectionID).doc(docID).collection(subcollectionID).doc(subcollectionDoc).get()
    }
    else{
      return this.afs.firestore.collection(collectionID).doc(docID).get()
    }
    
  }
  getMultipleDocs(collection, keyArray) {
    // takes collection and array of keys returning associated docs
    let promises = []
    keyArray.forEach(key => {
      promises.push(new Promise(resolve => {
        this.getDoc(collection, key).then(
          r => resolve(r.data())
        )
      })
      )
    });
    return Promise.all(promises)
  }
  getSubCollection(collectionID1, docID, collectionID2) {
    // return observer for subcollection documents
    return this.afs.collection(collectionID1).doc(docID).collection(collectionID2).valueChanges();
  }

  addFarmer(data,key?) {
    // create db entries and mark registration survey as completed (registration survey id hardcoded)
    // pass existing key to update data
    console.log('adding farmer',data,key)
    if(key==undefined){key = this.afs.createId()}
    data._key = key
    console.log('key',data._key)
    let batch = this.afs.firestore.batch();
    let ref1 = this.afs.firestore.collection('Farmers').doc(key)
    batch.set(ref1, data)
    let ref2 = this.afs.firestore.collection('Farmers').doc(key).collection('Surveys').doc('3blD3GGrIzuuPjD47a08')
    batch.set(ref2, {
      _key: '3blD3GGrIzuuPjD47a08',
      completed: new Date()
    })
    let ref3 = this.afs.firestore.collection('Surveys').doc('3blD3GGrIzuuPjD47a08').collection('Farmers').doc(key)
    batch.set(ref3, {
      _key: key,
      completed: new Date()
    })
    return batch.commit()
  }
  enrolFarmerInExperiment(farmerKey, experimentKey) {
    console.log('enrolling', farmerKey, experimentKey)
    // updates farmer and experiment 
    let batch = this.afs.firestore.batch();
    let fRef = this.afs.firestore.collection('Farmers').doc(farmerKey).collection('Experiments').doc(experimentKey);
    batch.set(fRef, {
      _key: experimentKey,
      enrolled: new Date()
    })
    let eRef = this.afs.firestore.collection('Experiments').doc(experimentKey).collection('Farmers').doc(farmerKey)
    batch.set(eRef, {
      _key: farmerKey,
      enrolled: new Date()
    });
    batch.commit()
      .then(_ => console.log('successfully updated'))
      .catch(err => console.log('err', err))
  }
  submitSurvey(farmerKey, surveyKey, surveyData) {
    let batch = this.afs.firestore.batch();
    let fRef = this.afs.firestore.collection('Farmers').doc(farmerKey).collection('Surveys').doc(surveyKey);
    batch.set(fRef, {
      _key: surveyKey,
      completed: new Date()
    })
    let eRef = this.afs.firestore.collection('Surveys').doc(surveyKey).collection('Farmers').doc(farmerKey)
    batch.set(eRef, surveyData);
    return batch.commit()
  }


}
