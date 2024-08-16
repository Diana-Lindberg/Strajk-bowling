import { expect, test } from "vitest";
import Booking from "./Booking";
import { render, fireEvent, screen } from '@testing-library/react';


describe('Booking', () => {
    test('renders without crashing', () => {
      render(<Booking />);
      expect(screen.getByRole('button', { name: /strIIIIIike!/i })).toBeInTheDocument();
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

test('submitting booking should show booking number and total price and user can go back to booking page', async () => {
  render(<Booking />);
  const dateInput = screen.getByLabelText('Date')
  const timeInput = screen.getByLabelText('Time')
  const numberInput = screen.getByLabelText('Number of awesome bowlers')
  const lanesInput = screen.getByLabelText('Number of lanes')

  fireEvent.click(screen.getByText('+'));
  const ShoeInput = screen.getByLabelText('Shoe size / person 1')

  fireEvent.change(dateInput, {target: { value: '2024-05-05'}});
  fireEvent.change(timeInput, {target: { value: '16:00'}});
  fireEvent.change(numberInput, {target: { value: '1'}});
  fireEvent.change(lanesInput, {target: { value: '1'}});
  fireEvent.change(ShoeInput, {target: { value: '37'}});
  fireEvent.click(screen.getByText('strIIIIIike!'));

  const bookingNumber = await screen.findByDisplayValue('ABC12345');
  const totalPrice =  screen.getByText('220 sek');

  expect(bookingNumber).toBeInTheDocument();
  expect(totalPrice).toBeInTheDocument();

  fireEvent.click(screen.getByText("Sweet, let's go!"));
  const bookingTitle = await screen.findByText('Booking',{selector: 'h1.top__title'});
  expect(bookingTitle).toBeInTheDocument();



//   const confirmationDetails = {
//     active: true,
//     when: '2024-05-05T16:00',
//     people: '2',
//     lanes: '1',
//     id: '12345',
//     price: '340',
//   };
//  render(
//     <Confirmation confirmationDetails={confirmationDetails} />
//   );
//   expect(screen.getByDisplayValue('2024-05-05 16:00')).toBeInTheDocument();
//   expect(screen.getByDisplayValue('2')).toBeInTheDocument();
//   expect(screen.getByDisplayValue('1')).toBeInTheDocument();
//   expect(screen.getByDisplayValue('12345')).toBeInTheDocument();
//   expect(screen.getByText('Total:')).toBeInTheDocument();
//   expect(screen.getByText('340 sek')).toBeInTheDocument();
});

// test('user can go back to booking page', async () => {
  
  // fireEvent.click(screen.getByText('Sweet, let's go!'))
  // const bookingTitle = await screen.findByText('Booking',{selector: 'h1.top__title',} );
  // expect (bookingTitle.toBeInTheDocument());
  // render (<App />);
  // const navIcon =screen.getByTestId('navicon');
  // fireEvent.click(navIcon);
  // await expect(
  //   screen.findByLabelText('Number of awesome bowlers')
  // ).resolves.toBeInTheDocument();


  // let confirmationSet = false;

  // const setConfirmation = () => {
  //   confirmationSet = true;
  // };
  // const { getByText } = render(
  //   <Confirmation
  //     confirmationDetails={{
  //       active: true,
  //       when: '2024-05-05T16:00',
  //       people: '2',
  //       lanes: '2',
  //       id: '12345',
  //       price: '340',
  //     }}
  //     setConfirmation={setConfirmation}
  //   />
  // );
  // fireEvent.click(getByText("Sweet, let's go!"));
  // expect(confirmationSet).toBe(true);
// });


