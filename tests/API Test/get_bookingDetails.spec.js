
/* get booking details using path parameter and query parameter 

type: GET
endpoint: /booking/
path parameter: booking id
query parameter: firstname and lastname

*/

import { test, expect } from "@playwright/test";

test('Get booking details using path parameter', async ({ request }) => {

    //get booking details using path parameter (booking id)
    const bookingId = 4640;
    //const response = await request.get('/booking/bookingId', { params: { bookingId } }); // one way to pass path parameter  
    const response = await request.get(`/booking/${bookingId}`);  // another way to pass path parameter

    //extract the response body as JSON
    const responseBody = await response.json();

    //validate the response status code and status text
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    //validate the response body has greater than 0 booking details
    expect(responseBody.length).toBeGreaterThan(0);

    //log the response body for debugging purposes
    console.log('Response Body:', responseBody);

});

test.only('Get booking details using query parameter', async ({ request }) => {

    //get booking details using query parameter (firstname and lastname) 
    
    const firstname = 'ningappa';
    const lastname = 'ningagol';
    
    // pass query parameter in the endpoint
    //const response = await request.get(`/booking?firstname=${firstname}&lastname=${lastname}`);  //one way to pass query parameter
    const response = await request.get('/booking', { params: { firstname, lastname } }); // another way to pass query parameter

    //extract the response body as JSON
    const responseBody = await response.json();

    //validate the response status code and status text
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    //validate the response body has greater than 0 booking details
    expect(responseBody.length).toBeGreaterThan(0); // validate the response body has greater than 0 booking details
    expect(responseBody.bookingid).toBeGreaterThan(0); // validate the booking id should be greater than 0

    //log the response body for debugging purposes
    console.log('Response Body:', responseBody);

    //validate booking id should be number and should be greater than 0 using for of loop

    for (const booking of responseBody) {
        expect(booking).toHaveProperty('bookingid');
        expect(typeof booking.bookingid).toBe('number');

    }

});
