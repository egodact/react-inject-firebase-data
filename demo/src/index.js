import React, { Component } from 'react'
import { render } from 'react-dom'
import InjectFirebaseData from '../../src'
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
import HOCDemo from './HOCDemo';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const ref = firebase.database().ref().child('foo');

const Demo = () => (
  <div>
    <h1>react-inject-firebase-data Demo</h1>
    <InjectFirebaseData firebaseRef={ref}>
      {({ data, dataKey }) => <h1>{dataKey}: {data}</h1>}
    </InjectFirebaseData>
    <HOCDemo />
  </div>
);

render(<Demo />, document.querySelector('#demo'))
