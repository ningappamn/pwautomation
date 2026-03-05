/*
Create new booking with POST request using faker library to generate dynamic request body and validate the response

http method: POST
endpoint: /booking

Json body: dynamically generated using faker library
Coomand - npm install @faker-js/faker

Datetime : generate using the Luxon library matches the expected API format
Command - npm install luxon

*/

import { test ,expect} from "@playwright/test";
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';


test('Create new booking with POST request and generate dynamic request body using faker library', async ({ request }) => {
  
  //generate dynamic request body using faker library
  const requestBody = {
    "firstname": faker.person.firstName(),
    "lastname": faker.person.lastName(),
    "totalprice": faker.number.int({ min: 50, max: 500 }),
    "depositpaid": faker.datatype.boolean(),
    "bookingdates": {
        "checkin": DateTime.now().toFormat('yyyy-MM-dd'),
        "checkout": DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd')
    },
    "additionalneeds": faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'None'])   
  };

// Send POST request to create a new booking
  const response = await request.post('/booking', {data: requestBody});     

  // Validate the response status code and status text
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy(); 

  // Validate the response body
  const responseBody = await response.json(); //extract the response body as JSON

  //log the response body for debugging purposes
  console.log('Response Body:', responseBody); 
  
  //validate the response body has the expected properties and values
  expect(responseBody).toHaveProperty('bookingid');
  expect(responseBody).toHaveProperty('booking');
  expect(responseBody).toHaveProperty('booking.bookingdates');

  // Validate the booking details in the response body match the request body

  expect(responseBody.booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
    additionalneeds: requestBody.additionalneeds
  });

  // validate the nested bookingdates object in the response body matches the request body

  expect(responseBody.booking.bookingdates).toMatchObject({
        "checkin": requestBody.bookingdates.checkin,
        "checkout": requestBody.bookingdates.checkout});
});
