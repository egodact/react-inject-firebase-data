import React, { Component } from 'react';
import { render } from 'react-dom';
import InjectFirebaseData from '../../src';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
import HOCDemo from './HOCDemo';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const ref = firebase.database().ref().child('foo');

const Demo = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
    }}
  >
    <h2 style={{ marginTop: 0, fontFamily: 'sans-serif', fontWeight: 400 }}>
      react-inject-firebase-data
    </h2>
    <div style={{ fontFamily: 'Andale Mono, monospace' }}>
      <InjectFirebaseData firebaseRef={ref}>
        {({ data, dataKey }) => <h1>/{dataKey}: "{data}"</h1>}
      </InjectFirebaseData>
      <HOCDemo />
    </div>
  </div>
);

render(<Demo />, document.querySelector('#demo'));
