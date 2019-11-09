import React from 'react';
import { HistoryProvider } from '../components/providers/HistoryProvider';
import App from '../components/App';
import { render, fireEvent, cleanup } from '@testing-library/react';

/**
 * Test the row addition operation functions correctly
 */
afterEach(cleanup)

test('The addition of two rows results in the correct output', () => {
    const { queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>,);

    let input = queryByTestId('R1ValueTop');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('R2ValueTop');
    fireEvent.change(input, { target: { value: '2' } })

    let scalarInput = queryByTestId('scalarValueTop');
    fireEvent.change(scalarInput, { target: { value: '2' } })

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

    // second row: 0x + 1.5y + 1z + -4w = -2.5
    input = queryByTestId('5');
    fireEvent.change(input, { target: { value: '0' } })
    input = queryByTestId('6');
    fireEvent.change(input, { target: { value: '1.5' } })
    input = queryByTestId('7');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('8');
    fireEvent.change(input, { target: { value: '-4' } })
    input = queryByTestId('9');
    fireEvent.change(input, { target: { value: '-2.5' } })

    fireEvent.click(queryByTestId(/rowAdditionButton/i));

    // result: 2x + 5.5y + 1z -12w = 2.5  
    let element = queryByTestId('5');
    expect(element.value).toBe('2')
    element = queryByTestId('6');
    expect(element.value).toBe('5.5')
    element = queryByTestId('7');
    expect(element.value).toBe('1')
    element = queryByTestId('8');
    expect(element.value).toBe('-12')
    element = queryByTestId('9');
    expect(element.value).toBe('7.5')
})

test('The subtraction of a row results in the correct output', () => {
    const { queryByTestId, getByText } = render(<HistoryProvider><App /></HistoryProvider>,);

    // create a 5x5 matrix
    let input = queryByTestId(/minput/i)
    fireEvent.change(input, { target: { value: 5 } })
    input = queryByTestId(/ninput/i)
    fireEvent.change(input, { target: { value: 5 } })
    fireEvent.click(getByText(/make matrix/i));

    input = queryByTestId('R1ValueTop');
    // second row selector
    fireEvent.change(input, { target: { value: '3' } })
    input = queryByTestId('R2ValueTop');
    fireEvent.change(input, { target: { value: '5' } })

    let scalarInput = queryByTestId('scalarValueTop');
    fireEvent.change(scalarInput, { target: { value: '-2' } })

    // R3: 1x + 2y + 0z + -4w = 5
    input = queryByTestId('10');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('11');
    fireEvent.change(input, { target: { value: '2' } })
    input = queryByTestId('12');
    fireEvent.change(input, { target: { value: '0' } })
    input = queryByTestId('13');
    fireEvent.change(input, { target: { value: '-4' } })
    input = queryByTestId('14');
    fireEvent.change(input, { target: { value: '5' } })

    // R5: 0x + 1.5y + 1z + -4w = -2.5
    input = queryByTestId('20');
    fireEvent.change(input, { target: { value: '0' } })
    input = queryByTestId('21');
    fireEvent.change(input, { target: { value: '1.5' } })
    input = queryByTestId('22');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('23');
    fireEvent.change(input, { target: { value: '-4' } })
    input = queryByTestId('24');
    fireEvent.change(input, { target: { value: '-2.5' } })

    fireEvent.click(queryByTestId(/rowAdditionButton/i));

    // result: -2x - 3.5y + 1z +4w = -12.5  
    let element = queryByTestId('20');
    expect(element.value).toBe('-2')
    element = queryByTestId('21');
    expect(element.value).toBe('-2.5')
    element = queryByTestId('22');
    expect(element.value).toBe('1')
    element = queryByTestId('23');
    expect(element.value).toBe('4')
    element = queryByTestId('24');
    expect(element.value).toBe('-12.5')
})

test('The addition of a row with non numeric values works as expected', () => {
    const { queryByTestId, getByText } = render(<HistoryProvider><App /></HistoryProvider>,);
    
    // create a 5x5 matrix
    let input = queryByTestId(/minput/i)
    fireEvent.change(input, { target: { value: 5 } })
    input = queryByTestId(/ninput/i)
    fireEvent.change(input, { target: { value: 5 } })
    fireEvent.click(getByText(/make matrix/i));

    input = queryByTestId('R1ValueTop');
    // second row selector
    fireEvent.change(input, { target: { value: '3' } })
    input = queryByTestId('R2ValueTop');
    fireEvent.change(input, { target: { value: '5' } })

    let scalarInput = queryByTestId('scalarValueTop');
    fireEvent.change(scalarInput, { target: { value: '2' } })

    // R3: -x + .y + 1z + 2w = 5
    input = queryByTestId('10');
    fireEvent.change(input, { target: { value: '-' } })
    input = queryByTestId('11');
    fireEvent.change(input, { target: { value: '.' } })
    input = queryByTestId('12');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('13');
    fireEvent.change(input, { target: { value: '2' } })
    input = queryByTestId('14');
    fireEvent.change(input, { target: { value: '5' } })

    // R5: 1x + 1y + tz + rw = 1
    input = queryByTestId('20');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('21');
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('22');
    fireEvent.change(input, { target: { value: 't' } })
    input = queryByTestId('23');
    fireEvent.change(input, { target: { value: 'r' } })
    input = queryByTestId('24');
    fireEvent.change(input, { target: { value: '1' } })

    fireEvent.click(queryByTestId(/rowAdditionButton/i));

    // non numeric values treated as zero so
    // result: 1x + 1y + 2z + 4w = 11 
    let element = queryByTestId('20');
    expect(element.value).toBe('1')
    element = queryByTestId('21');
    expect(element.value).toBe('1')
    element = queryByTestId('22');
    expect(element.value).toBe('2')
    element = queryByTestId('23');
    expect(element.value).toBe('4')
    element = queryByTestId('24');
    expect(element.value).toBe('11')
})

test('The addition of row to itself has no effect and logs error', () => {
    const { queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>,);
    console.error = jest.fn()

    let input = queryByTestId('R1ValueTop');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } })
    input = queryByTestId('R2ValueTop');
    fireEvent.change(input, { target: { value: '1' } })

    let scalarInput = queryByTestId('scalarValueTop');
    fireEvent.change(scalarInput, { target: { value: 2 } })

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

    fireEvent.click(queryByTestId(/rowAdditionButton/i));

    // error logged
    expect(console.error).toHaveBeenCalled();

    // same state  
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