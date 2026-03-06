import { test, expect } from "@playwright/test";

import { BookingAPI } from "../../Programs/bookingAPI";     

test('create and update booking', async ({ request }) => {

    const bookingAPI = new BookingAPI(request);

    const requestBody = {
        firstname: "ningappa",
        lastname: "ningagol",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2024-01-10"
        },
        additionalneeds: "Breakfast"
    };

    //create booking
    const response = await bookingAPI.createBooking(requestBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Booking Response:", responseBody);

    const bookingId = responseBody.bookingid;

    //auth token
    const authBody = {
        username: "admin",
        password: "password123"
    };

    const authResponse = await bookingAPI.createToken(authBody);

    expect(authResponse.ok()).toBeTruthy();
    expect(authResponse.status()).toBe(200);

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;

    console.log("Token:", token);

    //update booking
    const updateBody = {
        firstname: "adhira",
        lastname: "mn",
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-01-01",
            checkout: "2026-01-10"
        },
        additionalneeds: "Dinner"
    };

    const updateResponse = await bookingAPI.updateBooking(bookingId, token, updateBody);

    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updateResponseBody = await updateResponse.json();
    console.log("Updated Booking:", updateResponseBody);
});