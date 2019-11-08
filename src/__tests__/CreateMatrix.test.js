import React from 'react';
import App from '../components/App.js';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup)

test('A 5x5 matrix is displayed at page load', () => {
    const { queryByTestId } = render(<App />);

    // there are 24 elements rendered (id is zero-indexed)
    let element = queryByTestId('24');
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('25');
    expect(element).toBeNull();
})

test('A 3x4 matrix is displayed after inputs', () => {
    const { getAllByDisplayValue, getByText, queryByTestId } = render(<App />);

    let elements = getAllByDisplayValue('');

    let input = elements[0];
    fireEvent.change(input, { target: { value: 3 } })
    input = elements[1];
    fireEvent.change(input, { target: { value: 4 } })

    fireEvent.click(getByText(/make matrix/i));

    // there are 11 elements rendered
    let element = queryByTestId('11')
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('13')
    expect(element).toBeNull();
})

test('The matrix is reset when button clicked', () => {
    const { getAllByDisplayValue, getByText, queryByTestId } = render(<App />);

    let elements = getAllByDisplayValue('');

    let input = elements[0];
    fireEvent.change(input, { target: { value: 3 } })
    input = elements[1];
    fireEvent.change(input, { target: { value: 4 } })

    fireEvent.click(getByText(/make matrix/i));

    // there are 11 elements rendered
    let element = queryByTestId('11')
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('13')
    expect(element).toBeNull();

    fireEvent.click(getByText(/reset/i));

    // there are again 24 elements rendered
    element = queryByTestId('24');
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('25');
    expect(element).toBeNull();
})