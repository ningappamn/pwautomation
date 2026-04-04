/*
Create new booking with POST request using static JSON body and validate the response

http method: POST
endpoint: /booking
Json body:json body is stored in a separate file (Testdata/Post_Request_Body.json) and imported into the test

*/

import { test ,expect} from "@playwright/test";
import fs from 'fs';

test('Create new booking with POST request read request body from JSON file', async ({ request }) => {
  
  //read the request body from the JSON file and parse it as JSON
  const filePath = 'Testdata/Post_Request_Body.json';
  const requestBody = JSON.parse(fs.readFileSync(filePath, 'utf-8'));  

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
