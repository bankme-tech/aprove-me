import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

export function renderWithRouter(
  component: JSX.Element,
  route: string = '/',
  state: undefined = undefined,
  reduce = (state: any, action: any) => state,
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