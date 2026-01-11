class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
    }

    async redirectToUrl() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginDteails(uname, pass) {
        await this.username.fill(uname);
        await this.password.fill(pass);
        await this.loginButton.click();
    }
    async validateLoginSuccess() {
        await this.page.waitForURL('**/inventory.html');
    }
}

module.exports = { LoginPage };
