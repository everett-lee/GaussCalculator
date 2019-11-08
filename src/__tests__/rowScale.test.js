import React from 'react';
import App from '../components/App.js';
import { render, fireEvent, cleanup } from '@testing-library/react';

/**
 * Test the row addition operation functions correctly
 */

afterEach(cleanup)

test('The multiplication of a row results in the correct output', () => {
    const { queryByTestId } = render(<App />);

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } });

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '2.5' } });

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } });
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } });
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } });
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } });
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } });

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // result: 2.5 + 5y + 0z - 10w = 12.5
    let element = queryByTestId('0');
    expect(element.value).toBe('2.5');
    element = queryByTestId('1');
    expect(element.value).toBe('5');
    element = queryByTestId('2');
    expect(element.value).toBe('0');
    element = queryByTestId('3');
    expect(element.value).toBe('-10');
    element = queryByTestId('4');
    expect(element.value).toBe('12.5');
})

test('The multiplication of a row by negative results in the correct output', () => {
    const { queryByTestId } = render(<App />);

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } });

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '-2' } });

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } });
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } });
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } });
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } });
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } });

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // result: -2 + -4y + 0z + 8w = -10
    let element = queryByTestId('0');
    expect(element.value).toBe('-2');
    element = queryByTestId('1');
    expect(element.value).toBe('-4');
    element = queryByTestId('2');
    expect(element.value).toBe('0');
    element = queryByTestId('3');
    expect(element.value).toBe('8');
    element = queryByTestId('4');
    expect(element.value).toBe('-10');
})

test('The multiplication of a row by zero is not possible', () => {
    const { queryByTestId } = render(<App />);
    console.error = jest.fn()

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } })

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '0' } })

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } })
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } })
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } })
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } })

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // error logged
    expect(console.error).toHaveBeenCalled();

    // state is unchanged 
    // result: 1x + 2y + 0z + -4w = 5
    let element = queryByTestId('0');
    expect(element.value).toBe('1')
    element = queryByTestId('1');
    expect(element.value).toBe('2')
    element = queryByTestId('2');
    expect(element.value).toBe('0')
    element = queryByTestId('3');
    expect(element.value).toBe('-4')
    element = queryByTestId('4');
    expect(element.value).toBe('5')
})

test('The multiplication of a row by .0 is not possible', () => {
    const { queryByTestId } = render(<App />);

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } })

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '.0' } })

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } })
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } })
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } })
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } })

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // state is unchanged 
    // result: 1x + 2y + 0z + -4w = 5
    let element = queryByTestId('0');
    expect(element.value).toBe('1')
    element = queryByTestId('1');
    expect(element.value).toBe('2')
    element = queryByTestId('2');
    expect(element.value).toBe('0')
    element = queryByTestId('3');
    expect(element.value).toBe('-4')
    element = queryByTestId('4');
    expect(element.value).toBe('5')
})


test('The division of a row results in the correct output', () => {
    const { queryByTestId } = render(<App />);

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } });

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '2' } });

    let switchOpButton = queryByTestId(/setOperationButton/);
    fireEvent.click(switchOpButton);

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } });
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } });
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } });
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } });
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } });

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // result: 0.5 + 1y + 0z - 8w = 2.5
    let element = queryByTestId('0');
    expect(element.value).toBe('0.5');
    element = queryByTestId('1');
    expect(element.value).toBe('1');
    element = queryByTestId('2');
    expect(element.value).toBe('0');
    element = queryByTestId('3');
    expect(element.value).toBe('-2');
    element = queryByTestId('4');
    expect(element.value).toBe('2.5');
})

test('The division of a row by decimal results in the correct output', () => {
    const { queryByTestId } = render(<App />);

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } });

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '0.5' } });

    let switchOpButton = queryByTestId(/setOperationButton/);
    fireEvent.click(switchOpButton);

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } });
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } });
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } });
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } });
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } });

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // result: 2 + 4y + 0z - 8w = 10
    let element = queryByTestId('0');
    expect(element.value).toBe('2');
    element = queryByTestId('1');
    expect(element.value).toBe('4');
    element = queryByTestId('2');
    expect(element.value).toBe('0');
    element = queryByTestId('3');
    expect(element.value).toBe('-8');
    element = queryByTestId('4');
    expect(element.value).toBe('10');
})

test('The division of a row by decimal by zero leaves state unchanged', () => {
    const { queryByTestId } = render(<App />);

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } });

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '0' } });

    let switchOpButton = queryByTestId(/setOperationButton/);
    fireEvent.click(switchOpButton);

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } });
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } });
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } });
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } });
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } });

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // state is unchanged
    // result: 1x + 2y + 0z + -4w = 5
    let element = queryByTestId('0');
    expect(element.value).toBe('1');
    element = queryByTestId('1');
    expect(element.value).toBe('2');
    element = queryByTestId('2');
    expect(element.value).toBe('0');
    element = queryByTestId('3');
    expect(element.value).toBe('-4');
    element = queryByTestId('4');
    expect(element.value).toBe('5');
})

test('The division of a row by decimal by .0 leaves state unchanged', () => {
    const { queryByTestId } = render(<App />);

    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } });

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '.0' } });

    let switchOpButton = queryByTestId(/setOperationButton/);
    fireEvent.click(switchOpButton);

    // top row: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('0');
    fireEvent.change(input, { target: { value: '1' } });
    input = queryByTestId('1');
    fireEvent.change(input, { target: { value: '2' } });
    input = queryByTestId('2');
    fireEvent.change(input, { target: { value: '0' } });
    input = queryByTestId('3');
    fireEvent.change(input, { target: { value: '-4' } });
    input = queryByTestId('4');
    fireEvent.change(input, { target: { value: '5' } });

    fireEvent.click(queryByTestId(/rowScaleButton/i));

    // state is unchanged
    // result: 1x + 2y + 0z + -4w = 5
    let element = queryByTestId('0');
    expect(element.value).toBe('1');
    element = queryByTestId('1');
    expect(element.value).toBe('2');
    element = queryByTestId('2');
    expect(element.value).toBe('0');
    element = queryByTestId('3');
    expect(element.value).toBe('-4');
    element = queryByTestId('4');
    expect(element.value).toBe('5');
})