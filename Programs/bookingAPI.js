export class BookingAPI {

    constructor(request) {
        this.request = request;
        this.baseURL = "https://restful-booker.herokuapp.com";
    }

    //create booking
    async createBooking(requestBody) {
        const response = await this.request.post(`${this.baseURL}/booking`, {
            data: requestBody
        });
        return response;
    }

    //generate token
    async createToken(authBody) {
        const response = await this.request.post(`${this.baseURL}/auth`, {
            data: authBody
        });
        return response;
    }

    //update booking
    async updateBooking(bookingId, token, updateBody) {
        const response = await this.request.put(`${this.baseURL}/booking/${bookingId}`, {
            headers: {
                'cookie': `token=${token}`
            },
            data: updateBody
        });
        return response;
    }

    //partial update booking
    async partialUpdateBooking(bookingId, token, updateBody) {
        const response = await this.request.patch(`${this.baseURL}/booking/${bookingId}`, {
            headers: {
                'cookie': `token=${token}`
            },
            data: updateBody
        });
        return response;
    }
}