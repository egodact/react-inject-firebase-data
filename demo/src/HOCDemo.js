import React from 'react';
import { InjectFirebaseDataHOC } from '../../src';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const ref = firebase.database().ref().child('bar');

const HOCDemo = ({ data, dataKey }) => (
  <h1>/{dataKey}: "{data}"</h1>
);

export default InjectFirebaseDataHOC(ref)(HOCDemo);
