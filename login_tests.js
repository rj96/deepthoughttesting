import { Selector } from "testcafe";

fixture('Login Suite').page("https://dev.deepthought.education/login");
test("Login with valid credentials", async (t) => {
    await t.maximizeWindow();
    await t
        .typeText("#username", "TesterRatnesh") //#user-name is to get element using the ID
        .typeText("#password", "hwdC@G7fHgTJ6q7")
        .click("#login");
     const currentUrl = await t.eval(() => window.location.href); 
    // URL to match against
    const expectedUrl = 'https://dev.deepthought.education/dashboard';
    // Checking that the current URL matches the expected URL
    await t.expect(currentUrl).eql(expectedUrl);
    console.log('Logging a variable:',{currentUrl});
    await t.click("#dropdownMenuButton");
    const logoutButton = Selector('button').withText('Logout');
    await t.click(logoutButton);   
});
test("Login with invalid password", async (t) => {
    await t
        .typeText("#username", "TesterRatnesh")
        .typeText("#password", "hwdC@G7fHgTJ6q")
        .click("#login");
    // check invalid login credentials message
    const loginErrorAlert = Selector('#login-error-notify');
    const alertText = await loginErrorAlert.textContent;
    const expectedErrorMessage = '\n\t\t\t\t×\n\t\t\t\tLogin Unsuccessful\n\t\t\t\tInvalid login credentials\n\t\t\t';
    await t.expect(alertText).eql(expectedErrorMessage);
});
test("Login with invalid username", async (t) => {
    await t
        .typeText("#username", "TesterRatnes")
        .typeText("#password", "hwdC@G7fHgTJ6q7")
        .click("#login");
    // check invalid login credentials message
    const loginErrorAlert = Selector('#login-error-notify');
    const alertText = await loginErrorAlert.textContent;
    const expectedErrorMessage = '\n\t\t\t\t×\n\t\t\t\tLogin Unsuccessful\n\t\t\t\tInvalid login credentials\n\t\t\t';
    await t.expect(alertText).eql(expectedErrorMessage);
});
test("Login with both field empty", async (t) => {
    await t.click("#login");
    // check invalid login credentials message
    const loginErrorAlert = Selector('#login-error-notify');
    const alertText = await loginErrorAlert.textContent;
    const expectedErrorMessage = '\n\t\t\t\t×\n\t\t\t\tLogin Unsuccessful\n\t\t\t\tPlease specify both a username and password\n\t\t\t';
    await t.expect(alertText).eql(expectedErrorMessage);
});
test("Login leaving password field empty", async (t) => {
    await t
        .typeText("#username", "TesterRatnesh")
        .click("#login");
    // check invalid login credentials message
    const loginErrorAlert = Selector('#login-error-notify');
    const alertText = await loginErrorAlert.textContent;
    const expectedErrorMessage = '\n\t\t\t\t×\n\t\t\t\tLogin Unsuccessful\n\t\t\t\tPlease specify both a username and password\n\t\t\t';
    await t.expect(alertText).eql(expectedErrorMessage);
});
test("Login with username field empty", async (t) => {
    await t
        .typeText("#password", "hwdC@G7fHgTJ6q7")
        .click("#login");
    // check invalid login credentials message
    const loginErrorAlert = Selector('#login-error-notify');
    const alertText = await loginErrorAlert.textContent;
    const expectedErrorMessage = '\n\t\t\t\t×\n\t\t\t\tLogin Unsuccessful\n\t\t\t\tPlease specify both a username and password\n\t\t\t';
    await t.expect(alertText).eql(expectedErrorMessage);
});