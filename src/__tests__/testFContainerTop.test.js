import React from 'react';
import App from '../components/App.js';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup)

test('The matrix is reset when button clicked', () => {
    const { getAllByDisplayValue, getByDisplayValue, queryByTestId } = render(<App />);

    let elements = getAllByDisplayValue('');
    // first row selector
    let input = elements[2];
    // second row selector
    fireEvent.change(input, { target: { value: 3 } })
    input = elements[3];
    fireEvent.change(input, { target: { value: 4 } })

    let scalarInput = getByDisplayValue('1');
    fireEvent.change(scalarInput, { target: { value: 4 } })


   // fireEvent.click(getByText(/make matrix/i));

})