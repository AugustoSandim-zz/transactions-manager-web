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

describe('NewTransaction', () => {
  it('renders without crashing', () => {
    const component = renderNewTransaction();

    expect(component.find('.new-transaction')).toHaveLength(1);
  });

  it('renders the errors when submitted with input values empty', async () => {
    const component = renderNewTransaction();
    component.update();

    component.find('form').simulate('submit');
    component.update();

    expect(component.text()).toContain('Digite o valor');
  });

  it('renders the message success on submitted', () => {
    const component = renderNewTransaction();

    const transactionValue = component.find('input[name="transactionValue"]');
    const description = component.find('input[name="description"]');

    transactionValue.simulate('change', {
      target: {name: 'transactionValue', value: '600'},
    });

    description.simulate('change', {
      target: {name: 'description', value: 'test'},
    });

    component.find('form').simulate('submit');
    component.update();

    expect(component.text()).toContain('Transação cadastrada com sucesso!');
  });
});
