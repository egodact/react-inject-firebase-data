# react-inject-firebase-data
React component that injects real-time Firebase data.

![Demo screenshot](https://github.com/rafaelklaessen/react-inject-firebase-data/raw/master/screenshots/screenshot.png "Screenshot of the demo")

## Install
`yarn add react-inject-firebase-data` or `npm install --save react-inject-firebase-data`

## Usage
See the [demo](https://github.com/rafaelklaessen/react-inject-firebase-data/tree/master/demo/src) for full examples.

### With a function as children
```javascript
import * as firebase from 'firebase';
import InjectFirebaseData from 'react-inject-firebase-data';

const App = () => (
  <InjectFirebaseData firebaseRef={firebase.database().ref().child('foo')}>
    {({ data }) => <pre>{data}</pre>}
  </InjectFirebaseData>
);
```

### With the Higher-Order Component
```javascript
import * as firebase from 'firebase';
import { InjectFirebaseDataHOC } from 'react-inject-firebase-data';

const App = ({ data }) => <pre>{data}</pre>;

export default InjectFirebaseDataHOC(
  firebase.database().ref().child('foo')
)(App);
```

## Props
`*` = required

Prop | Description | Type | Default
---- | ----------- | ---- | -------
`firebaseRef*` | The Firebase database reference from which the value should be received | `object` |
`renderWhileLoading` | When `true`, the children function gets called before the data is loaded | `bool` | `false`
`children*` | The children function | `func` |

### Props with the Higher-Order Component
Signature:

`InjectFirebaseDataHOC(firebaseRef: firebase.database.Reference, renderWhileLoading: bool) => (WrappedComponent: React.Component) => React.Component`

For parameter explanation, see the props table.

### Parameters passed to the `children` function or the WrappedComponent
The `children` function receives an object as its argument, which contains the following keys:

Key | Description | Type
--- | ----------- | ----
`data` | The retrieved Firebase data | `any`
`dataKey` | The key of the retrieved data | `string`
`loading` | `true` when the Firebase data has not yet been received. Only gets passed when the `renderWhileLoading` prop is set to `true` | `bool`

For the Higher-Order Component, this object becomes the wrapped component's props.

## Development
### Installation
`yarn install` or `npm install`

### Run demo
`yarn start` or `npm start`

### Run tests
`yarn test` or `npm test`

#### Building
`yarn build` or `npm run build` will build the component for publishing to npm and also bundle the demo app.

`yarn clean` or `npm run clean` will delete built resources.

Notice that you'll need to temporarily delete `.babelrc` to be able to build the component (just put it back after you're done building).
