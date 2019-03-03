describe('Project Portal ', function() {

    const loginPageUrl = 'http://localhost:4200/login';
    const homePageUrl = 'http://localhost:4200/home';
    const manageProjectsUrl = 'http://localhost:4200/manageProjects'
    const showProjectsUrl = 'http://localhost:4200/displayProjects'

    //Check if the login screen loads up successfully
    it('Project Portal home page should load successfully', function() {
      browser.get(loginPageUrl);
  
      let heading = element(by.css('.loginheader'));
      let headingText = heading.getText();
      expect(heading.getText()).toBe('Welcome to Project Portal');

    });
  
    it('Guest login should take him to the homepage', function() {
        browser.get(loginPageUrl);

        let loginAsGuestButton = element(by.css('.guest-button')).click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toBe(homePageUrl);
    });

    it('Registered user login should take user to the homepage', function() {
        browser.get(loginPageUrl);
        const email = element(by.name('email'));
        email.clear().then(() => {
          email.sendKeys('alex@bu.edu');
        });
      
        const password = element(by.name('password'));
        password.clear().then(() => {
          password.sendKeys('eliza@1776');
        });
        
        let loginAsUserButton = element(by.css('.user-login-button')).click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toBe(homePageUrl);
    });

    it('Manage projects link should redirect to manage projects page', function() {
      browser.get(homePageUrl);
      let manageProjectsButton = element(by.css("#manage-projects-button")).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(manageProjectsUrl);
    });


    it('Show projects link should redirect to display projects page', function() {
      browser.get(homePageUrl);
      let manageProjectsButton = element(by.css("#manage-projects-button")).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(manageProjectsUrl);
    });

   
  });
