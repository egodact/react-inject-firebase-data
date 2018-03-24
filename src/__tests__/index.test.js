import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import InjectFirebaseData from '../index';

beforeAll(() => {
  global.node = null;
  global.fakeRef = {
    on: (path, callback) => callback({ key: 'foo', val: () => 'bar' }),
    off: () => {}
  };
});

afterAll(() => {
  delete global.node;
  delete global.fakeRef;
});

beforeEach(() => {
  node = document.createElement('div');
});

afterEach(() => {
  unmountComponentAtNode(node);
});

describe('Component', () => {
  it('renders without crashing', () => {
    render(
      <InjectFirebaseData firebaseRef={fakeRef}>
        {() => null}
      </InjectFirebaseData>,
      node
    );
  });

  it('calls its children function with the loaded data & data key', async () => {
    const childSpy = jest.fn().mockReturnValue(null);
    render(
      <InjectFirebaseData firebaseRef={fakeRef}>
        {childSpy}
      </InjectFirebaseData>,
      node,
      async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(childSpy.mock.calls.length).toBe(1);
        expect(childSpy.mock.calls[0][0]).toEqual({
          loading: false,
          data: 'bar',
          dataKey: 'foo'
        });
      }
    );
  });

  it('calls its children function before the data is loaded when renderWhileLoading is true', () => {
    const childSpy = jest.fn().mockReturnValue(null);
    const fakeRef = {
      on: () => {},
      off: () => {}
    };

    render(
      <InjectFirebaseData firebaseRef={fakeRef} renderWhileLoading>
        {childSpy}
      </InjectFirebaseData>,
      node,
      () => {
        expect(childSpy.mock.calls.length).toBe(1);
        expect(childSpy.mock.calls[0][0]).toEqual({
          loading: true,
          data: null,
          dataKey: null
        });
      }
    );
  });
});
