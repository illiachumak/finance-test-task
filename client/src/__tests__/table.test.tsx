import React from 'react';
import { render, fireEvent, getAllByTestId } from '@testing-library/react';
import TickerTable from '../components/Table';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('TickerTable', () => {
  it('renders TickerTable component', () => {
    const { container } = render(
      <Provider store={store}>
        <TickerTable />
      </Provider>
    );
    expect(container).toBeTruthy();
  })
})
