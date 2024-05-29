import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { TAssignorsRedux } from '../../src/types/AssignorsType';

export function renderWithRouter(
  component: JSX.Element,
  route: string = '/',
  state: TAssignorsRedux = {},
  reduce = (state: TAssignorsRedux, action: any) => state,
  store = createStore(reduce, state)
) {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(
      <BrowserRouter>
        <Provider store={store}>{component}</Provider>
      </BrowserRouter>
    ),
    user: userEvent.setup(),
    store,
  };
}