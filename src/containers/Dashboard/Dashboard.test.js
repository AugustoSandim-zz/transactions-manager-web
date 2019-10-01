/* global expect, jest */
import React from 'react';
import {mount} from 'enzyme';
import {Route, MemoryRouter} from 'react-router-dom';
import Dashboard from './index';
import {login} from '../../services/auth';

function renderDashboard() {
  return mount(
    <MemoryRouter>
      <Route render={props => <Dashboard {...props} />} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  login('user@test.com');
});

describe('Dashboard', () => {
  it('renders without crashing', () => {
    const component = renderDashboard();

    expect(component).toMatchSnapshot();
  });

  it('renders message empty list', () => {
    const component = renderDashboard();

    expect(component.text()).toContain('Nenhuma transação cadastrada!');
  });

  it('renders value of total amount zero', () => {
    const component = renderDashboard();
    const amount = component.find('.dashboard__amount');

    expect(amount.text()).toContain('0,00');
  });

  it('renders list with card item', () => {
    global.localStorage.setItem(
      'user@test.com',
      JSON.stringify([
        {
          created: '2019-10-01T05:39:46.753Z',
          description: 'Descrição aqui',
          transactionValue: 'R$ 621,52',
        },
      ]),
    );

    const component = renderDashboard();
    component.update();

    const amount = component.find('.dashboard__amount');

    expect(component.find('.item').text()).toContain('R$ 621,52');
    expect(amount.text()).not.toContain('R$ 0,00');
  });

  it('renders total amount  correctly', () => {
    global.localStorage.setItem(
      'user@test.com',
      JSON.stringify([
        {
          created: '2019-10-01T05:39:46.753Z',
          description: 'Descrição aqui',
          transactionValue: 'R$ 621,52',
        },
        {
          created: '2019-10-02T05:39:46.753Z',
          description: 'Segunda',
          transactionValue: 'R$ 328,65',
        },
      ]),
    );

    const component = renderDashboard();
    component.update();

    const amount = component.find('.dashboard__amount');

    expect(amount.text()).toContain('R$ 950,17');
  });
});
