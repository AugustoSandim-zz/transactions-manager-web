/* global expect, jest */
import React from 'react';
import {mount} from 'enzyme';
import {Route, MemoryRouter} from 'react-router-dom';
import NewTransaction from './index';

function renderNewTransaction() {
  return mount(
    <MemoryRouter>
      <Route render={props => <NewTransaction {...props} />} />
    </MemoryRouter>,
  );
}

it('renders without crashing', () => {
  const component = renderNewTransaction();

  expect(component.find('.new-transaction')).toHaveLength(1);
});
