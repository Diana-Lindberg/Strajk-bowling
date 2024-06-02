import { test } from "vitest";
import { render, fireEvent, screen } from '@testing-library/react'
import Input from './Input';
import Booking from "../../views/Booking";

test('user can select a date', () => {
    const handleChange = () => {}
    render(
        <Input
        label='Date'
        type='date'
        name='when'
        handleChange={handleChange}
         />
    );

    const input = screen.getByLabelText('Date')
    fireEvent.change(input, {target: {value:"2024-05-05"}})
    expect(input.value).toBe("2024-05-05")
});

test('user can select time', () => {
    const handleChange = () => {}
    render(
        <Input
        label='Time'
        type='time'
        name='time'
        handleChange={handleChange}
      />
    );
    const input = screen.getByLabelText('Time')
    fireEvent.change (input, {target: {value:"16:00"}})
    expect(input.value).toBe('16:00')
})

test('user can select number of players', () => {
    const handleChange = () => {}
    render(
        <Input
        label='Number of awesome bowlers'
        type='number'
        name='people'
        handleChange={handleChange}
      />
      );

      const input = screen.getByLabelText('Number of awesome bowlers')
      fireEvent.change(input, {target: {value:"2"}})
      expect(input.value).toBe("2")
});

test('user can select number of lanes', () => {
    const handleChange = () => {}
    render(
        <Input
        label='Number of Lanes'
        type='number'
        name='lanes'
        handleChange={handleChange}
      />
      );

      const input = screen.getByLabelText('Number of Lanes')
      fireEvent.change(input, {target: {value:"1"}})
      expect(input.value).toBe("1")
    });

    test('user will not proceed if all fields are not filled in', () => {
      render(<Booking />);
      const date = screen.getByLabelText('Date');
      const time = screen.getByLabelText('Time');
      const players = screen.getByLabelText('Number of awesome bowlers');
      const submitButton = screen.getByText('strIIIIIike!');
    
      fireEvent.change(date, { target: { value: '' } });
      fireEvent.change(time, { target: { value: '' } });
      fireEvent.change(players, { target: { value: '' } });
      fireEvent.click(submitButton);

      const ErrorMessage = screen.getByText('Fill out all the fields and make sure that people and shoes is the same number.');
      expect(ErrorMessage).toBeInTheDocument();
      
    });
   