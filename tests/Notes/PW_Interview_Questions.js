
/*
1. What is playwright ?

    Ans : Playwright is an open-source automation framework developed by Microsoft, used for end-to-end web application testing

2. Why Playwright is preferred over Selenium nowadays?

    Ans : Playwright is faster compared to Selenium in performance. It has built-in auto-waiting, whereas in Selenium you need to add waits manually. Playwright also provides advanced debugging features, supports executing multiple tests in parallel, has native cross-browser support, and offers API mocking capabilities.

 3. Can we run the same test in parallel on different workers?
    Ans : No, we cannot run the same test file in parallel across different workers. However, Playwright can run multiple different tests in parallel on separate workers. Splitting a single test file to run the same test in different workers is not possible.

 4. How do you install Playwright?
    Ans: Download and install Node.js from the official website (https://nodejs.org/).
        
    After installing Node.js, you can use npm (Node Package Manager) to initialize a new Node.js 
    Command: npm init -y 
    
    after installing Node.js and initializing node js, we can use npm or yarn to install Playwright in our project. 
    command : npm install -D @playwright/test
   
    after installing the Playwright framework we need to install the necessary browsers to execute the test cases using below command. 
    command : npx playwright install
    
    npm init -y - is used to intialize a new node js project and it will create a package.json file in our project
    npm install -D playwright/test - is used to install playwright framework in our project and it will add test library in our poject and it will save it in package.json file under devDependencies section
    npm playwright install - is used to install the nessesary browser to excute the test cases
    
    commands to install node js and Playwright :


 5. Difference between page.click() and locator.click() ?
    Ans: page.click() - clicks immediately, it will not wait for the element to be ready and may fail if the element is not ready.it uses selector to find the element and click on it.
         locator.click() waits for the element and then clicks, so it is more reliable.it uses locator to find the elementand click on it.

    clicks an element immediately and may fail if the element is not ready,
    while locator.click() automatically waits, retries, and interacts reliably with dynamic elements.     

   6. What are locators in playwright ?

    Ans: Locators are GPS in playwright ,locators are used to identify the web element to performe actions such click, select, fill and navidate

   7. How do you handle input and dropdown in playwright ?
    Ans: input we use fill() and type()

    Ex: page.locator('input').fill('nings');

         dropdown we use selectOptions();
    Ex: page.locator('dropdown').selectOptions('india');        

    8.how do you take screenshots and record videos in playwright ?

     Ans: capture specific web element using page.screenshots({path:'page.png'})
          capure entire full page using page.screenshots({path:'page.png',fullPage:true})
          also we can configure in config file :
          export default defineConfig({
            use: {
                screenshot: 'only-on-failure', // takes screenshot only when test fails
            },
            });

          record video in playwright configre it in playwright config file :
          export default defineConfig({
                use: {
                    video: true, 
                },
                });

    9. how to do you open or handle multiple browser conext and multiple tabs      
       (Pages)?     

        Ans: In Playwright, multiple tabs are handled using pages. We create a single browser context and then create multiple pages (tabs) within that context

        For multiple users or isolated sessions, we use multiple browser contexts, and each context can have its own separate pages. 



        
          //  Multiple Users (Contexts)

            //create two separte browser contexts
            const context1=await browser.newContext();
            const context2=await browser.newContext();

            //create pages in each context
            const page1=await context1.newPage();
            await page1.goto('https://www.google.com');

            const page2=await context2.newPage();
            await page2.goto('https://www.github.com');

          //  Multiple Tabs (Pages in same context)

            const context = await browser.newContext();
            const tab1 = await context.newPage();
            await tab1.goto('https://example.com');

            const tab2 = await context.newPage();
            await tab2.goto('https://example.com');


    10. difference between browser, context and page in playwright ?

    Ans: 1. In Playwright, a browser is main instance or represents the entire browser instance
         2. browser context or context is an isolated session within the browser that can have its own cookies and cache and allows you to create multiple independent sessions within the same browser instance.
         3. page is a single tab or window within a context where you interact with web content. and we can have multiple pages within a single context


    11. How do you handle frames in playwright ?

    Ans: In Playwright, we can handle frames using the frame() method. We can switch to a specific frame by its name, URL, or index.

    Example:
    // Switch to a frame by name
    const frame = page.frame({ name: 'frameName' });
    await frame.click('button');

    // Switch to a frame by URL
    const frameByUrl = page.frame({ url: /frameUrl/ });
    await frameByUrl.fill('input', 'text');

    // Switch to a frame by index
    const frameByIndex = page.frames()[0]; // First frame
    await frameByIndex.selectOption('select', 'optionValue');   

 12. How do you handle alerts and pop-ups in playwright ?

    Ans: In Playwright, we can handle alerts and pop-ups using the page.on('dialog') event.this event is triggered whenever an alert, confirm, prompt, or beforeunload dialog appears on the page. 

    Example:
    page.on('dialog', async (dialog) => {
        console.log(dialog.message()); // Log the alert message
        await dialog.accept(); // Accept the alert
        // or await dialog.dismiss(); // Dismiss the alert
    });    

  13. How do you handle file uploads and downloads in playwright ?

    Ans: In Playwright, we can handle file uploads using the setInputFiles() method to set the file input element with the desired file.

    Example for file upload:
    await page.setInputFiles('input[type="file"]', 'path/to/file.txt');

    In Playwright, file downloads are handled using the page.waitForEvent('download') method, combined with the action using Promise.all(), and then saved using download.saveAs().

        Example - 01 : for file download:
        page.on('download', async (download) => {
            const path = await download.path();
            console.log(`File downloaded to: ${path}`);
            await download.saveAs('path/to/save/file.txt'); // Save the downloaded file
        });     

        Example - 02 : for file download:
        const [download] = await Promise.all([
                page.waitForEvent('download'), // Wait for the download event
                page.click('button#download'), // Trigger the download action
        ]);

        download.saveAs('path/to/save/file.txt'); // Save the downloaded file

14. why we use Promise.all() in playwright ?

      Ans: we use promise.all() method in playwright when action and event happens at the same time
      always use promise.all() method, when action triggers an event and we need to capture that event
      Example:
      const [download] = await Promise.all([
          page.waitForEvent('download'), // Wait for the download event
          page.click('button#download'), // Trigger the download action
      ]);
      download.saveAs('path/to/save/file.txt'); // Save the downloaded file

15. when to use page.waitforEvent() and when to use context.waitForEvent() in playwright ?

      Ans : we use page.waitforEvent() when we want to wait for an event that is specific to a single page such as a download, dialog, or console message.

      Example:
        
      promise.all([page.waitForEvent('download'), page.click('button#download')]); // Wait for a download event to occur on the current page
      promise.all([page.waitForEvent('dialog'), page.click('button#trigger-dialog')]); // Wait for a dialog event to occur on the current page
      promise.all([page.waitForEvent('console'), page.click('button#trigger-console')]); // Wait for a console message event to occur on the current page
      promise.all([page.waitForEvent('request'), page.click('button#trigger-request')]); // Wait for a network request event to occur on the current page
      promise.all([page.waitForEvent('response'), page.click('button#trigger-response')]); // Wait for a network response event to occur on the current page
      promise.all([page.waitForEvent('popup'), page.click('button#trigger-popup')]); // Wait for a new page (popup) to open
      promise.all([page.waitForEvent('close'), page.click('button#trigger-close')]); // Wait for the current page to close
      promise.all([page.waitForEvent('crash'), page.click('button#trigger-crash')]); // Wait for the current page to crash

      we use context.waitForEvent() when we want to wait for an event that can occur across multiple pages within the same browser context, such as a new page being opened or a page being closed.

      example:

      promise.all([context.waitForEvent('page'), page.click('button#trigger-new-page')]); // Wait for a new page to open within the same context
      promise.all([context.waitForEvent('close'), page.click('button#trigger-close')]); // Wait for any page within the context to close
      promise.all([context.waitForEvent('crash'), page.click('button#trigger-crash')]); // Wait for any page within the context to crash      

16. Explain the folder structure you prefer for Playwright tests ?
Ans: I always prefer to organize or modular folder structure for Playwright tests. Here is an example of the folder structure I prefer:

- tests/
  - e2e/ (for end-to-end tests)
    - login.spec.js
    - signup.spec.js
    - dashboard.spec.js
  - api/ (for API tests)
    - userApi.spec.js
    - productApi.spec.js
  - utils/ (for utility functions and helpers)
    - testUtils.js
  - fixtures/ (for test data and mock data)
    - users.json
    - products.json
  - config/ (for configuration files)
    - playwright.config.js

  This structure allows me to separate different types of tests, keep utility functions organized, and manage test data effectively. It helps to maintain stability and scalability and readability of the test suite.

17. How do you handle test data in Playwright ?

    Ans: In Playwright, I handle test data using fixtures. Fixtures allow me to set up and manage test data in a structured way. I can create fixture files (e.g., users.json, products.json) to store test data and then load that data in my tests using the test framework's fixture mechanism.

    Example of loading test data from a fixture:

    // In users.json
    {
      "validUser": {
        "username": "testuser",
        "password": "password123"
      },
      "invalidUser": {
        "username": "invaliduser",
        "password": "wrongpassword"
      }
    }

    // In the test file
    import users from '../fixtures/users.json';

    test('Login with valid user', async ({ page }) => {
      await page.goto('https://example.com/login');
      await page.fill('#username', users.validUser.username);
      await page.fill('#password', users.validUser.password);
      await page.click('#login-button');
      // Add assertions here
    });

    This approach allows me to keep test data separate from test logic, making it easier to manage and maintain. I can also easily update test data without modifying the test code, which helps in keeping the tests stable and scalable.    



18. How do you handle test configuration and environment variables in Playwright ?

    Ans: In Playwright, I handle test configuration and environment variables using the playwright.config.js file. This file allows me to define various settings such as test directory, timeout, retries, and environment-specific configurations.

    Example of playwright.config.js:

    import { defineConfig } from '@playwright/test';

    export default defineConfig({
      testDir: './tests',
      timeout: 30000,
      retries: 2,
      use: {
        headless: true,
        baseURL: 'https://example.com',
        // Other global settings
      },
      projects: [
        {
          name: 'chromium',
          use: { browserName: 'chromium' },
        },
        {
          name: 'firefox',
          use: { browserName: 'firefox' },
        },
        {
          name: 'chromium-headless',
          use: { browserName: 'chromium', headless: true },
        },
      ],
    });

    For environment variables, I can use the process.env object to access environment variables in my tests. I can set environment variables in the terminal before running the tests or use a .env file with a library like dotenv to load them.

    Example of using environment variables in tests:

    // In the terminal
    export BASE_URL=https://example.com             

19. How do you handle test reporting and debugging in Playwright ?

    Ans: In Playwright, I handle test reporting using the built-in test reporter or by integrating third-party reporting tools. The built-in reporter provides detailed information about test execution, including passed, failed, and skipped tests. I can also configure it to generate HTML reports for better visualization.

    For debugging, Playwright offers several features such as:

    - Debug mode: I can run tests in debug mode using the --debug flag, which allows me to step through the test execution and inspect elements interactively.
    - Console logs: I can use console.log statements in my tests to output relevant information for debugging purposes.
    - Screenshots and videos: I can configure Playwright to capture screenshots and record videos of test runs, which can be helpful for diagnosing issues when tests fail.

    Example of enabling debug mode:
    npx playwright test --debug

    Example of capturing screenshots on failure:
    export default defineConfig({
      use: {
        screenshot: 'only-on-failure',
      },
    });

    Example of capturing videos:
    export default defineConfig({
      use: {
        video: 'on',
      },
    });

    These features help me to quickly identify and resolve issues in my tests, ensuring that they are stable and reliable.          
    
20. how do you handle reusablity in playwright ?

    Ans: In Playwright, I handle reusability by creating reusable functions, custom commands, and page object models. This allows me to avoid code duplication and maintain a clean and organized test suite.

    - Reusable functions: I create utility functions for common actions such as logging in, filling forms, or navigating to specific pages. These functions can be imported and used across multiple test files.

    Example of a reusable function:
    export async function login(page, username, password) {
      await page.goto('https://example.com/login');
      await page.fill('#username', username);
      await page.fill('#password', password);
      await page.click('#login-button');
    }

    - Custom commands: I can extend Playwright's functionality by creating custom commands that encapsulate complex interactions or sequences of actions.

    Example of a custom command:
    import { test } from '@playwright/test';

    test.extend({
      async login(page, username, password) {
        await page.goto('https://example.com/login');
        await page.fill('#username', username);
        await page.fill('#password', password);
        await page.click('#login-button');
      },
    });

    - Page Object Model (POM): I implement the Page Object Model design pattern to create classes that represent different pages of the application. Each class contains methods that interact with the elements on that page, making it easier to maintain and reuse code.

    Example of a Page Object Model:
    class LoginPage {
      constructor(page) {
        this.page = page;
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
      }

      async login(username, password) {
        await this.page.goto('https://example.com/login');
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
      }
    }

    By using these approaches, I can ensure that my tests are more maintainable, scalable, and easier to read, while also reducing the chances of introducing bugs due to code duplication.   

21.Uses of test.describe() and test.beforeEach() in playwright ?

    Ans: In Playwright, test.describe() is used to group related tests together, providing a way to organize tests into logical sections. It allows you to define a block of tests that share a common setup or context.

    Example of test.describe():
    test.describe('Login Tests', () => {
      test('should log in with valid credentials', async ({ page }) => {
        // Test code for valid login
      });

      test('should not log in with invalid credentials', async ({ page }) => {
        // Test code for invalid login
      });
    });

    test.beforeEach() is a hook that runs before each test within a describe block. It is used to set up the necessary preconditions for the tests, such as navigating to a specific page or initializing data.

    Example of test.beforeEach():
    test.describe('Login Tests', () => {
      test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/login');
      });         


22.how do you handle environment specific configuration in playwright ?

    Ans: In Playwright, I handle environment-specific configuration by using environment variables and conditional logic in the playwright.config.js file. This allows me to define different settings for various environments (e.g., development, staging, production) without hardcoding values in the test code.

    Example of handling environment-specific configuration:
    import { defineConfig } from '@playwright/test';

    export default defineConfig({
      use: {
        baseURL: process.env.BASE_URL || 'https://default-url.com',
        headless: process.env.HEADLESS === 'true',
      },
      // Other configurations...
    });

    In this example, the baseURL and headless settings are determined by environment variables. I can set these variables in the terminal before running the tests or use a .env file with a library like dotenv to manage them.

    Example of setting environment variables in the terminal:
    export BASE_URL=https://staging-url.com
    export HEADLESS=false

 23. How do you handle test retries and timeouts in Playwright ?

  Ans: In Playwright, I handle test retries and timeouts using the configuration options in the playwright.config.js file. I can specify the number of retries for failed tests and set a global timeout for test execution.
  
    Example of handling test retries and timeouts:
    import { defineConfig } from '@playwright/test';

    export default defineConfig({
      retries: 2, // Number of retries for failed tests
      timeout: 30000, // Global timeout for test execution (in milliseconds)
      // Other configurations...
    });

24. How do you handle flaky tests in Playwright ?

    Ans: To handle flaky tests in Playwright, I use a combination of strategies such as:

    - Implementing retries: I configure the test runner to automatically retry failed tests a certain number of times, which can help mitigate transient issues.

    - Adding proper waits: I ensure that I use appropriate waiting mechanisms (e.g., waitForSelector, waitForEvent) to handle dynamic content and avoid timing issues.

    - Using stable locators: I choose reliable selectors for locating elements to minimize the chances of tests breaking due to changes in the UI.

25. how do you handle cross-browser testing in Playwright ?

    Ans: Playwright has built-in support for cross-browser testing. I can configure my tests to run on multiple browsers (e.g., Chromium, Firefox, WebKit) by defining projects in the playwright.config.js file.

    Example of handling cross-browser testing:
    import { defineConfig } from '@playwright/test';

    export default defineConfig({
      projects: [
        {
          name: 'chromium',
          use: { browserName: 'chromium' },
        },
        {
          name: 'firefox',
          use: { browserName: 'firefox' },
        },
        {
          name: 'webkit',
          use: { browserName: 'webkit' },
        },
      ],
      // Other configurations...
    });


26. How do you handle API testing in Playwright ?

    Ans: Playwright provides built-in support for API testing through its request and response handling capabilities. I can use the page.request object to send HTTP requests and validate responses directly within my tests.

    Example of handling API testing in Playwright:
    test('API Test Example', async ({ page }) => {
      const response = await page.request.get('https://api.example.com/data');    

27. how do you handle database testing in Playwright ?

    Ans: Playwright does not have built-in support for database testing, but I can handle database testing by integrating it with a database client library (e.g., MySQL, PostgreSQL, MongoDB) in my test code. I can establish a connection to the database, execute queries, and validate results as part of my test flow.

    Example of handling database testing in Playwright:
    import { Client } from 'pg'; // PostgreSQL client

    test('Database Test Example', async () => {
      const client = new Client({
        user: 'dbuser',
        host: 'localhost',
        database: 'testdb',
        password: 'password',
        port: 5432,
      });

      await client.connect();
      const res = await client.query('SELECT * FROM users WHERE id = $1', [1]);
      console.log(res.rows);
      await client.end();
    });   

28. what is the difference between locators and selectors in Playwright ?

    Selectors : selectors are used identify the element on the page and it just a string
    Locator : locators are used to intract with the element and it is an object which has built in auto waiting and retry mechanism.
Example : Selector = Address 
          Locator = GPS 

29. difference between locators and elements in Playwright ?

    Ans: In Playwright, locators are used to identify and interact with elements on a web page. A locator is an object that provides methods to perform actions (e.g., click, fill) and has built-in auto-waiting and retry mechanisms. An element, on the other hand, refers to the actual DOM element on the page that the locator interacts with.

    Example:
    const locator = page.locator('#submit-button'); // This is a locator
    await locator.click(); // Interacting with the element through the locator
30. differnce between page.locator() and page.$() in Playwright ?

    Ans: In Playwright, page.locator() is a method that returns a Locator object, which provides built-in auto-waiting and retry mechanisms for interacting with elements. It allows you to perform actions like click, fill, and select on the located element.

    Example of page.locator():
    const locator = page.locator('#submit-button');
    await locator.click();

    On the other hand, page.$() is a method that returns a Promise that resolves to the first ElementHandle matching the specified selector. It does not have built-in auto-waiting or retry mechanisms, so you may need to add explicit waits to ensure the element is present before interacting with it.

    Example of page.$():
    const elementHandle = await page.$('#submit-button');
    if (elementHandle) {
      await elementHandle.click();
    } else {
      console.log('Element not found');
    }

31. what are the inbuilt locators in Playwright ?
    Ans: getByRole, getByLabel, getByPlaceholder, getByText, getByAltText, getByTitle, getByTestId

    32. how do you handle dynamic locators in Playwright ?

    Ans: In Playwright, I handle dynamic locators by using strategies such as:

    - Using relative locators: I can use locators that are relative to other stable elements on the page, such as using getByRole or getByText to locate elements based on their role or visible text.

    - Using regular expressions: I can use regular expressions in my selectors to match dynamic parts of the locator.

    - Using data attributes: I can add custom data attributes to elements in the application code and use those attributes in my locators for more stability.

    - Implementing retry logic: If an element is expected to change frequently, I can implement retry logic in my tests to handle cases where the locator may not be immediately available. 

 32. how do you handle iframes in Playwright ?

    Ans: In Playwright, I handle iframes by using the frame() method to switch to the desired iframe context. I can identify the iframe by its name, URL, or index.

    Example of handling iframes in Playwright:
    // Switch to an iframe by name
    const frame = page.frame({ name: 'iframeName' });
    await frame.click('button');

    // Switch to an iframe by URL
    const frameByUrl = page.frame({ url: /iframeUrl/ });
    await frameByUrl.fill('input', 'text');

    // Switch to an iframe by index
    const frameByIndex = page.frames()[0]; // First iframe
    await frameByIndex.selectOption('select', 'optionValue'); 
    
33. how do you handle shadow DOM elements in Playwright ?

    Ans: In Playwright, I handle shadow DOM elements by using the locator API to pierce through the shadow DOM. I can use the :shadow pseudo-class in my selectors to access elements within the shadow DOM.

    Example of handling shadow DOM elements in Playwright:
    const shadowElement = page.locator('css=host-element >> css=shadow-element');
    await shadowElement.click();

    In this example, 'host-element' is the selector for the element that contains the shadow DOM, and 'shadow-element' is the selector for the element within the shadow DOM that I want to interact with. By using the >> operator, I can access and interact with elements inside the shadow DOM seamlessly.    
    

*/      

