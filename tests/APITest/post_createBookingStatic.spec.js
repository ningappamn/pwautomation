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

import { test ,expect} from "@playwright/test";

test('Create new booking with POST request and validate the response', async ({ request }) => {
  
  //static request body for creating a new booking

    const requestBody = {
    "firstname": "John",
    "lastname": "Doe",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2024-01-01",
        "checkout": "2024-01-10"
    },
    "additionalneeds": "Breakfast"
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
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    additionalneeds: 'Breakfast'
  });

  // validate the nested bookingdates object in the response body matches the request body

  expect(responseBody.booking.bookingdates).toMatchObject({
        "checkin": "2024-01-01",
        "checkout": "2024-01-10"});
});
