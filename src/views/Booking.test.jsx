import { test } from "vitest";
import Booking from "./Booking";
import { render, fireEvent, screen } from '@testing-library/react';
import Confirmation from "../components/Confirmation/Confirmation";


describe('Booking', () => {
    test('renders without crashing', () => {
      render(<Booking />);
    });
  
    test('allows user to add shoe sizes for each participant', () => {
      const { getByText, getByLabelText } = render(<Booking />);
      fireEvent.click(getByText('+'));
      fireEvent.change(getByLabelText('Shoe size / person 1'), { target: { value: '37' } });
      expect(getByLabelText('Shoe size / person 1').value).toBe('37');
    });
  
    test('allows user to remove a shoe size field', () => {
      const { getByText, queryByLabelText } = render(<Booking />);
      fireEvent.click(getByText('+'));
      expect(queryByLabelText('Shoe size / person 1')).toBeInTheDocument();
      fireEvent.click(getByText('-'));
      expect(queryByLabelText('Shoe size / person 1')).not.toBeInTheDocument();
    });
  });

test('submitting booking should show booking number and total price', () => {
  const { getByLabelText, getByText } = render(<Booking />);

  fireEvent.change(getByLabelText('Date'), { target: { value: '2024-05-05' } });
  fireEvent.change(getByLabelText('Time'), { target: { value: '16:00' } });
  fireEvent.change(getByLabelText('Number of lanes'), { target: { value: '1' } });
  fireEvent.change(getByLabelText('Number of awesome bowlers'), { target: { value: '2' } });

  fireEvent.click(getByText('strIIIIIike!'));
});

test('user can go back to booking page', () => {
  let confirmationSet = false;

  const setConfirmation = () => {
    confirmationSet = true;
  };
  const { getByText } = render(
    <Confirmation
      confirmationDetails={{
        active: true,
        when: '2024-05-05T16:00',
        people: '2',
        lanes: '2',
        id: '12345',
        price: '340',
      }}
      setConfirmation={setConfirmation}
    />
  );
  fireEvent.click(getByText("Sweet, let's go!"));
  expect(confirmationSet).toBe(true);
})


