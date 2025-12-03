//Playwright built in locators

/*
1. page.getByRole()  
2. page.getByText() 
3. page.getByLabel() 
4. page.getByPlaceholder()  
5. page.getByTestId () 
6. page.getByTitle()    
7. page.getByAltText() 
*/

/*
1. page.getByRole() - getByRole is a role-based locator used in Playwright to find elements using ARIA roles

Note : 
Syntax :
page.getByRole(role, options)

| Role       | Meaning                  |
| ---------- | ------------------------ |
| `button`   | Buttons                  |
| `textbox`  | Input fields / textareas |
| `link`     | Anchor `<a>`             |
| `heading`  | `<h1> <h2>...>`          |
| `checkbox` | Checkbox                 |
| `radio`    | Radio button             |
| `img`      | Images                   |
| `table`    | Tables                   |
| `row`      | Table row                |
| `cell`     | Table cell               |
| `tab`      | Tabs                     |
| `dialog`   | Modal popup              |

-------------------------------------------------------------------------
1.1 Button Example
HTML
<button>Login</button>

PlayWright

await page.getByRole('button', { name: 'Login' }).click();

-------------------------------------------------------------------------

1.2 Textbox Example
HTML
<input type="text" placeholder="Enter username" />

PlayWright

await page.getByRole('textbox',{name:'Enter username'})

-------------------------------------------------------------------------

1.3 Link Example

HTML
<a href="/home">Go Home</a>

PlayWright

await page.getByRole('Link',{name:'Go Home'}).click();

-------------------------------------------------------------------------

1.4 Checkbox Example

HTML
<label>
  <input type="checkbox" /> I agree
</label>

PlayWright

await page.getByRole('checkbox',{name:'I agree'}).check();

-------------------------------------------------------------------------

1.5 Radio Button

HTML 

<label>
  <input type="radio" /> Male
</label>


PlayWright
await page.getByRole('radio', { name: 'Male' }).check();

-------------------------------------------------------------------------

1.6 Heading Example

HTML
<h2>Login Page</h2>

PlayWright
await page.getByRole('Heading',{name:'Login Page',level: 2 });

-------------------------------------------------------------------------

1.7 Image Example

HTML 
<img src="logo.png" alt="Site Logo">

PlayWright
await page.getByrole('img',{name:'Site Logo'});

-------------------------------------------------------------------------

1.8 Table Row / Cell Example

PlayWright
await page.getByRole('table').getByRole('row', { name: /john/i });

-------------------------------------------------------------------------

1.9 Dialog / Modal Example

PlayWright 
await page.getByRole('dialog', { name: 'Confirmation' });

1.10 - Menue Item 
HTML
<div role="menu">
  <div role="menuitem">Profile</div>
  <div role="menuitem">Logout</div>
</div>

Playwright 
await page.getByRole('menuitem',{name:'Profile'});
await page.getByRole('menuitem',{name:'Logout'});

-------------------------------------------------------------------------

1.10 Tab Example

PlayWright 
await page.getByRole('Tab',{name:'Settings'}).click();

-------------------------------------------------------------------------

1.11 Real-time Example

HTML
<input type="text" aria-label="Email Address">
<button>Submit</button>

PlayWright

await page.getByRole('textbox',{name:'Email Address'}).fill('test@gmail.com');
await page.getByRole('button',{name:'Submit'}).click();

why prefered getByrole?
Ans - Does not break if HTML structure changes

-------------------------------------------------------------------------

2. page.getByText() - is a Playwright locator that finds an element by matching its visible text content

Use when: Element has unique visible text
          You want simple text matching
          No label or role is available

2.1 Simple Text Match

HTML
<div>Welcome to Playwright</div>

PlayWright 
await page.getByText('Welcome to Playwright')

2.2 Click a Button Using Text

HTML
<button>Login</button>

PlayWright

await page.getByText('Login').click();

2.3. Partial Text Match
<div>Loading... please wait</div>
await page.getByText('Loading');

2.4 Exact Match

HTML
<div>Submit</div>
<div>Submit Form</div>

PlayWright
await page.getBytext('Submit',{exact:true}).click();

2.5 Ignore Case

HTML
<div>welcome USER</div>

PlayWright
await page.getByText('welcome USER', { ignoreCase: true });

Using regex
await page.getByText(/welcome USER/i);


2.6 Regex Match

await page.getByText(/login/i).click();
-------------------------------------------------------------------------

3. page.getByLabel() 

Example - 01
HTML
<label for="email">Email Address:</label>

PlayWright
await page.getByLabel('Email Address:');

Example - 02

HTML 
<Label>
<input type="radio" name="shipping" value="standard">
</Label>

PlayWright
await page.getByLabel(' Standard');
-----------------------------------------------------------------------
4. page.getByAltText 

HTML

<div class="image-container">
            <img alt="logo image" src="https://playwright.dev/img/playwright-logo.svg">
            <p>Playwright Logo</p>
        </div>
 
PlayWright
await page.getByAltText('logo image') - Using getbyAltText()
await page.getByRole('img',{name:'logo image'}) - Using getByRole()

-----------------------------------------------------------------------

5. page.getByTitle() - 

Example 1 :
HTML
<li><a href="#" title="Home page link">Home</a></li>

Playwright 
await page.getByTitle('Home page link').click(); - using getByTitle()
await page.getByRole('Link',{name:'Home'}) -Using getByRole()
await page.getByText('Home').click(); - Using getByText()

Example 2: If menue item has titile 
HTML
<a title="Open Dashboard">Dashboard</a>

PlayWright
await page.getByTitle('Open Dashboard');

-----------------------------------------------------------------------

6. page.getByTestId() -
HTML
<h3 data-testid="profile-name">John Doe</h3>

Playwright
await page.getByTestId(profile-name); - using getByTestId()
await page.getByRole('Heading',{Level:3}) - using getByRole()
await page.getByRole('Heading',{name:'John Doe'}) - using getByRole()
await page.getByText('John Doe') - using getByText()

Example:02
HTML
<button data-testid="edit-profile-btn">Edit Profile</button>

PlayWright
await page.getByTestId('edit-profile-btn') - using getByTestId
await page.getByRole('button',{name:'Edit Profile'}) - using getByRole()
await page.getByText('Edit Profile') - using getByText()

Example : 03
HTML

<div class="card" data-testid="product-card-1">
                <h4 data-testid="product-name">Product A</h4>
                <p data-testid="product-price">$19.99</p>
            </div>

PlayWright
await page.getByTestId('product-card-1') - Using getByTestId()
await page.getByRole('Heading',{name='Product A'})() - using getByRole()
await page.getByText('Product A') - Using getByText();

-----------------------------------------------------------------------

7. page.getByPlaceHolder -  
Example 01

HTML
<div class="form-group">
            <textarea placeholder="Type your message here..." rows="4"></textarea>
        </div>
 
PlayWright
await page.getByPlaceHolder('Type your message here...').fill('Helo') - using getByPlaceHolder
await page.getByRole('textbox',{name='Type your message here...'}).fill('Helo') - Using getByPlaceHolder

Example 02
HTML
<div class="form-group">
            <input type="text" placeholder="Enter your full name" class="full-width">
        </div>

PlayWright
await page.getByPlaceHolder('Enter your full name').fill('Helo') - Using getByPlaceHolder() 
await page.getByRole('textbox',{name:'Enter your full name'}).fill('Helo') - using getByRole()
*/

