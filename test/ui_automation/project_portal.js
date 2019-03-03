describe('Project Portal ', function() {

    const loginPageUrl = 'http://localhost:4200/login';
    const homePageUrl = 'http://localhost:4200/home';
    const manageProjectsUrl = 'http://localhost:4200/manageProjects';
    const searchProjectsUrl = 'http://localhost:4200/displayProject';
    const registerPageUrl = 'http://localhost:4200/register';
    const editProjectPageUrl = 'http://localhost:4200/editProject?id=5c7083c7c6c4e2e97099d99d'

    /////////////////////////////////////////////////
    // Login screen
    /////////////////////////////////////////////////

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

    /////////////////////////////////////////////////
    // Toolbar
    /////////////////////////////////////////////////
   
    it('Home link should redirect to home page', function() {
      browser.get(homePageUrl);
      let manageProjectsButton = element(by.css(".home-button")).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(homePageUrl);
    });

    
    it('Manage projects link should redirect to manage projects page', function() {
      browser.get(homePageUrl);

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

      let manageProjectsButton = element(by.css(".manage-projects-button")).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(manageProjectsUrl);
    });


    it('Search projects link should redirect to display projects page', function() {
      browser.get(homePageUrl);
      let manageProjectsButton = element(by.css(".search-projects-button")).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(searchProjectsUrl);
    });


    it('Login link should redirect to login page', function() {
      browser.get(homePageUrl);
      let manageProjectsButton = element(by.css(".login-button")).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(loginPageUrl);
    });
   
    /////////////////////////////////////////////////
    // HOME PAGE
    /////////////////////////////////////////////////

    it('Repository link should redirect', function() {
      browser.get(homePageUrl);
      browser.ignoreSynchronization = true;
      let manageProjectsButton = element(by.css('a[href="https://github.com/yourbody"]')).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe("https://github.com/yourbody");
    });

    it('Demo link should redirect', function() {
      browser.get(homePageUrl);
      browser.ignoreSynchronization = true;
      let manageProjectsButton = element(by.css('a[href="http://yourbody-yourrights.com"]')).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe("http://yourbody-yourrights.com/");
    });

    /////////////////////////////////////////////////
    // MANAGE PROJECTS PAGE
    /////////////////////////////////////////////////

    it('Edit projects link should redirect', function() {

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
      browser.ignoreSynchronization = true;
      letManageProjects = element(by.css('.manage-projects-button')).click();
      browser.sleep(1000);
      let editProjectsButton = element(by.css('.edit-project-button')).click();
      browser.sleep(1000);
      expect(browser.getCurrentUrl()).toBe(editProjectPageUrl);
    });


  });
