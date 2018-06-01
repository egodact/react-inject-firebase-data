import React from 'react';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InjectFirebaseDataHOC from '../InjectFirebaseDataHOC';

Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
  global.fakeRef = {
    on: (path, callback) => callback({ key: 'foo', val: () => 'bar' }),
    off: () => {}
  };
});

afterAll(() => {
  delete global.fakeRef;
});

describe('InjectFirebaseDataHOC.js', () => {
  const Child = props => <div>{props}</div>;

  it('renders without crashing', () => {
    const Wrapped = InjectFirebaseDataHOC(fakeRef)(Child);
    const result = render(<Wrapped />);
    expect(result).toBeDefined();
  });

  it('renders an InjectFirebaseData component with the correct props', () => {
    const Wrapped = InjectFirebaseDataHOC(fakeRef)(Child);
    const result = shallow(<Wrapped />);
    expect(result.find('InjectFirebaseData').length).toBe(1);
    expect(result.find('InjectFirebaseData').props()).toEqual(
      expect.objectContaining({
        firebaseRef: fakeRef,
        renderWhileLoading: false
      })
    );
  });

  test('its displayName is correct', () => {
    const Wrapped = InjectFirebaseDataHOC(fakeRef)(Child);
    expect(Wrapped.displayName).toBe('InjectFirebaseData(Child)');
  });
});
