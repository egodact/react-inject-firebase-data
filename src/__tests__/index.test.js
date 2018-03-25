import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InjectFirebaseData from '../index';

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

describe('InjectFirebaseData', () => {
  it('renders without crashing', () => {
    const injectFirebaseData = render(
      <InjectFirebaseData firebaseRef={fakeRef}>
        {() => null}
      </InjectFirebaseData>
    );
    expect(injectFirebaseData).toBeDefined();
  });

  it('calls its children function with the loaded data & data key', async () => {
    const childSpy = jest.fn().mockReturnValue(null);
    mount(
      <InjectFirebaseData firebaseRef={fakeRef}>
        {childSpy}
      </InjectFirebaseData>
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(childSpy.mock.calls.length).toBe(1);
    expect(childSpy.mock.calls[0][0]).toEqual({
      data: 'bar',
      dataKey: 'foo'
    });
  });

  it('calls its children function before the data is loaded when renderWhileLoading is true', () => {
    const childSpy = jest.fn().mockReturnValue(null);
    const fakeRef = {
      on: () => {},
      off: () => {}
    };

    mount(
      <InjectFirebaseData firebaseRef={fakeRef} renderWhileLoading>
        {childSpy}
      </InjectFirebaseData>
    );
    expect(childSpy.mock.calls.length).toBe(1);
    expect(childSpy.mock.calls[0][0]).toEqual({
      loading: true,
      data: null,
      dataKey: null
    });
  });
});
