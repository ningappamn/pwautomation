/*
Create new booking with PUT request using static JSON body and validate the response

http method: PUT
endpoint: /booking/{id}
path parameter: booking id
Json body:json body is stored in a separate file (Testdata/Put_Request_Body.json) and imported into the test

*/

import { test, expect } from "@playwright/test";
import fs from 'fs';

import { json } from "stream/consumers";


function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test.only('update booking with data from JSON file', async ({ request }) => {

  //read the request body from the JSON file and parse it as JSON
  const requestBody = readJsonFile('Testdata/Post_Request_Body.json');

  // Send PUT request to update the booking
  const createresponse = await request.post('/booking', { data: requestBody });

  // Validate the response status code and status text
  expect(createresponse.status()).toBe(200);
  expect(createresponse.ok()).toBeTruthy();

  // Validate the response body
  const responseBody = await createresponse.json(); //extract the response body as JSON

  //log the response body for debugging purposes
  console.log('Response Body:', responseBody);
  console.log('booking id:', responseBody.bookingid);

  //create token for authentication
  const authrequestBody = readJsonFile('Testdata/Auth_Request_Body.json');
  const authresponse = await request.post('/auth', { data: authrequestBody });
  const authresponseBody = await authresponse.json();
  const token = authresponseBody.token;
  console.log('Token:', token);

  //update the booking details using put request with path parameter (booking id) and validate the response
  const bookingId = responseBody.bookingid; // get the booking id from the create response body
  const updaterequestBody = readJsonFile('Testdata/Put_Request_Body.json'); // read the update request body from the JSON file and parse it as JSON
  const updateresponse = await request.put(`/booking/${bookingId}`, {
    data: updaterequestBody,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    }
  });
  expect(updateresponse.status()).toBe(200);
  expect(updateresponse.ok()).toBeTruthy();

  const updateresponseBody = await updateresponse.json(); //extract the update response body as JSON

  console.log('Update Response Body:', updateresponseBody); //log the update response body for debugging purposes

});
