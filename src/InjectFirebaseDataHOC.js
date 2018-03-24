import React, { Component } from 'react';
import getDisplayName from 'react-display-name';
import InjectFirebaseData from './index';

const InjectFirebaseDataHOC = (
  firebaseRef,
  renderWhileLoading = false
) => (WrappedComponent) => {
  return class extends Component {
    static displayName = `InjectFirebaseData(${getDisplayName(Component)})`;

    render = () => (
      <InjectFirebaseData
        firebaseRef={firebaseRef}
        renderWhileLoading={renderWhileLoading}
      >
        {(props) => <WrappedComponent {...props} />}
      </InjectFirebaseData>
    );
  }
};

export default InjectFirebaseDataHOC;
