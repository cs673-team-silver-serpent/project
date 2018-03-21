describe('Project Portal ', function() {

    //Check if the login screen loads up successfully
    it('Project Portal Home Page should load successfully', function() {
      browser.get('http://localhost:4200/login');
  
      let heading=element(by.css('.loginheader'));
        let headingText=heading.getText();
      //var greeting = element(by.binding('yourName'));
  
      expect(heading.getText()).toBe('Boston University Project Tracker');
        console.log("It worked: " + headingText);
    });
  
    //Check if the user is directed to the Homepage on clicking Login
    it('User login should take him to the homepage', function() {
        browser.get('http://localhost:4200/login');

        let submitButton=element(by.css('.mat-raised-button')).click();
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toBe('http://localhost:4200/home');
        element.browser.getCurrentUrl.then(function(text) {
            console.log(text);
        });
        //console.log("Current UrL: " + browser.getCurrentUrl());
    })
   
  });