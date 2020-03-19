import React from 'react';
import { HistoryProvider } from '../components/providers/HistoryProvider';
import App from '../components/App';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup)

test('A 4x5 matrix is displayed at page load', () => {
    const { queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>,);

    // there are 20 elements rendered (id is zero-indexed)
    let element = queryByTestId('19');
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('20');
    expect(element).toBeNull();
})

test('A 3x4 matrix is displayed after inputs', () => {
    const { getByText, queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>);

     // create a 3x4 matrix
     let input = queryByTestId(/minput/i);
     fireEvent.change(input, { target: { value: 3 } });
     input = queryByTestId(/ninput/i);
     fireEvent.change(input, { target: { value: 4 } });

    fireEvent.click(getByText(/make matrix/i));

    // there are 11 elements rendered
    let element = queryByTestId('11');
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('13');
    expect(element).toBeNull();
})

test('The matrix is reset when button clicked', () => {
    const { getAllByDisplayValue, getByText, queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>);

    let elements = getAllByDisplayValue('');

    let input = elements[0];
    fireEvent.change(input, { target: { value: 3 } });
    input = elements[1];
    fireEvent.change(input, { target: { value: 4 } });

    fireEvent.click(getByText(/make matrix/i));

    // there are 11 elements rendered
    let element = queryByTestId('11');
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('13');
    expect(element).toBeNull();

    fireEvent.click(getByText(/reset/i));

    // there are again 20 elements rendered
    element = queryByTestId('19');
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('20');
    expect(element).toBeNull();
})