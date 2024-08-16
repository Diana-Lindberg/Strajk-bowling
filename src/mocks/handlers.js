import { http, HttpResponse } from 'msw';

const confirmationDetails = {
  active: true,
  when: '2024-05-05T16:00',
  people: 1,
  size: 37,
  lanes: 1,
  id: 'ABC12345',
  price: 220,
};

export const handlers = [
   http.get('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', () => {
    return HttpResponse.json(confirmationDetails);
  }),
  http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', () => {
    return HttpResponse.json(confirmationDetails);
  }),
]