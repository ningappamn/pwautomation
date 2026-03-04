/*
Create new booking with POST request and validate the response

http method: POST
endpoint: /booking
Json body:

{
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2024-01-01",
        "checkout": "2024-01-10"
    },
    "additionalneeds": "Breakfast"
}   

*/

import { expect ,test} from '@playwright/test';

test('Create new booking with POST request and validate the response', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      "firstname": "John",
      "lastname": "Doe",
      "totalprice": 150,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2024-01-01",
        "checkout": "2024-01-10"
      },
      "additionalneeds": "Breakfast"
    }
  });

  // Validate the response status code
  expect(response.status()).toBe(200);

  // Validate the response body
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('bookingid');
  expect(responseBody.booking).toMatchObject({
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-01-01',
      checkout: '2024-01-10'
    },
    additionalneeds: 'Breakfast'
  });
});
