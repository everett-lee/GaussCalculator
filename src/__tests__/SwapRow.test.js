import React from 'react';
import App from '../components/App.js';
import { render, fireEvent, cleanup } from '@testing-library/react';

/**
 * Test the row addition operation functions correctly
 */


afterEach(cleanup)

test('Two rows are swapped in 5x5 matrix', () => {
    const { getByText, queryByTestId } = render(<App />);

    // elemetn 0,0
    let elementOne = queryByTestId('0');
    fireEvent.change(elementOne, { target: { value: 11 } })

    // element 1,0 
    let elementTwo = queryByTestId('5');
    fireEvent.change(elementTwo, { target: { value: 42 } })

    // element 3,4 
    let elementThree = queryByTestId('19');
    fireEvent.change(elementThree, { target: { value: 12 } })

    expect(elementOne.value).toBe('11');
    expect(elementTwo.value).toBe('42');
    expect(elementThree.value).toBe('12');

    fireEvent.click(getByText(/Row 1/i));
    fireEvent.click(getByText(/Row 2/i));

    // the rows are swapped
    expect(elementOne.value).toBe('42');
    expect(elementTwo.value).toBe('11');

    // the final row is unchanged
    expect(elementThree.value).toBe('12');
})


test('Row swapped with itself leaves matrix unchanged', () => {
    const { getAllByDisplayValue, getByText, queryByTestId } = render(<App />);

    // elemetn 0,0
    let elementOne = queryByTestId('0');
    fireEvent.change(elementOne, { target: { value: 11 } })

    // element 1,0 
    let elementTwo = queryByTestId('5');
    fireEvent.change(elementTwo, { target: { value: 42 } })

    // element 3,4 
    let elementThree = queryByTestId('19');
    fireEvent.change(elementThree, { target: { value: 12 } })

    expect(elementOne.value).toBe('11');
    expect(elementTwo.value).toBe('42');
    expect(elementThree.value).toBe('12');

    fireEvent.click(getByText(/Row 1/i));
    fireEvent.click(getByText(/Row 1/i));

    // values are unchanged
    expect(elementOne.value).toBe('11');
    expect(elementTwo.value).toBe('42');
    expect(elementThree.value).toBe('12');
})