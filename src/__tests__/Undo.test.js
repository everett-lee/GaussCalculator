import React from 'react';
import { HistoryProvider } from '../components/providers/HistoryProvider';
import App from '../components/App';
import { render, fireEvent, cleanup } from '@testing-library/react';

/**
 * test undo actions
 */
afterEach(cleanup)

test('Undo reverses row swap', () => {
    const { getByText, queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>);

    // reset matrix to zero matrix
    fireEvent.click(getByText(/reset/i));

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

    fireEvent.click(queryByTestId(/undoButton/i))

    // matrix is back to original state
    expect(elementOne.value).toBe('11');
    expect(elementTwo.value).toBe('42');
    expect(elementThree.value).toBe('12');
})

test('A 3x4 matrix is created and reverted to original 5x5', () => {
    const { getAllByDisplayValue, getByText, queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>);

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
    expect(element).toBeNull()

    fireEvent.click(queryByTestId(/undoButton/i));

    // there are 20 elements rendered
    element = queryByTestId('19')
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('20')
    expect(element).toBeNull()
})


test('Repeated undo actions leave matrix in original state', () => {
    const { getAllByDisplayValue, getByText, queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>);

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
    expect(element).toBeNull()

    // click undo 20 times
    for (let i = 0; i < 20; i++) {
        fireEvent.click(queryByTestId(/undoButton/i));
    }

    // there are 20 elements rendered
    element = queryByTestId('19')
    expect(element).not.toBeNull();

    // and no more 
    element = queryByTestId('20')
    expect(element).toBeNull()
})


test('Undo clears cell values', () => {
    const { queryByTestId, getByText } = render(<HistoryProvider><App /></HistoryProvider>);

    // reset matrix to zero matrix
    fireEvent.click(getByText(/reset/i));


    let input = queryByTestId('R1ValueBottom');
    // second row selector
    fireEvent.change(input, { target: { value: '1' } });

    let scalarInput = queryByTestId('scalarValueBottom');
    fireEvent.change(scalarInput, { target: { value: '2.5' } });

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

    fireEvent.click(queryByTestId(/undoButton/i));
    element = queryByTestId('4');
    expect(element.value).toBe('0');

    fireEvent.click(queryByTestId(/undoButton/i));
    element = queryByTestId('3');
    expect(element.value).toBe('0');

    fireEvent.click(queryByTestId(/undoButton/i));
    element = queryByTestId('2');
    expect(element.value).toBe('0');

    fireEvent.click(queryByTestId(/undoButton/i));
    element = queryByTestId('1');
    expect(element.value).toBe('0');

    fireEvent.click(queryByTestId(/undoButton/i));
    element = queryByTestId('0');
    expect(element.value).toBe('0');
});

test('Undo reverses row scale', () => {
    const { queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>);

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

    fireEvent.click(queryByTestId(/undoButton/i));

    // back to: 1x + 2y + 0z + -4w = 5
    element = queryByTestId('0');
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

test('Undo reverses row addition', () => {
    const { queryByTestId } = render(<HistoryProvider><App /></HistoryProvider>);

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

    fireEvent.click(queryByTestId(/undoButton/i));

    // back to: 0x + 1.5y + 1z + -4w = -2.5
    element = queryByTestId('5');
    expect(element.value).toBe('0')
    element = queryByTestId('6');
    expect(element.value).toBe('1.5')
    element = queryByTestId('7');
    expect(element.value).toBe('1')
    element = queryByTestId('8');
    expect(element.value).toBe('-4')
    element = queryByTestId('9');
    expect(element.value).toBe('-2.5')
})