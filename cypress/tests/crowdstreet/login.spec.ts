import {USERS} from "../../fixtures/user/user.js";

describe("SignUp Workflow", () => {

  const randomNumber = (len = 7) => {
    return Math.floor(Math.random() * 10 ** len);
  }
  
  beforeEach(()=> {
    cy.visit('/'); // visit baseUrl
    cy.url().should('include', Cypress.config().baseUrl);
  })
  
  it("should create an account", () => {
    const email = USERS.USERS.email+randomNumber(3);    
  
    cy.contains('Create An Account').click({force:true})
    cy.url().should('contain', 'create-account') // assert we are on sign up page
    
    // populate the form data
    cy.get('[id=create_account_email]').type(email).should('have.value',  email);
    cy.get('.wrap-on-mobile-container').first().find('input').first().type(USERS.USERS.firstname).should('have.value',  USERS.USERS.firstname);
    cy.get('.wrap-on-mobile-container').first().find('input').last().type(USERS.USERS.lastname).should('have.value',  USERS.USERS.lastname);
    cy.get('.password-input-container').first().find('input').type(USERS.USERS.password).should('have.value',  USERS.USERS.password);
    cy.get('.password-confirm-input').first().find('input').type(USERS.USERS.password).should('have.value',  USERS.USERS.password);
    cy.get('.input-container').eq(6).find('input').type(USERS.USERS.phone).should('have.value',  USERS.USERS.phone);
    cy.get('.input-container').eq(7).find('input').type(USERS.USERS.address).should('have.value',  USERS.USERS.address);
    cy.get('.input-container').eq(8).find('input').type(USERS.USERS.city).should('have.value',  USERS.USERS.city);
    cy.get('div[action="select"]').click();
    cy.get('div[role="listbox"]').find('div').eq(1).click();
    cy.get('div[action="select"]').should('have.contain',  USERS.USERS.state);
    cy.get('.input-container').eq(10).find('input').type(USERS.USERS.zip).should('have.value',  USERS.USERS.zip);
    cy.get('div[data-react-toolbox="radio-group"]').find('label').first().click();
    cy.get('label[data-react-toolbox="checkbox"]').first().click();
    cy.get('label[data-react-toolbox="checkbox"]').last().click();
    
    // get the iframe to click on captcha checkbox
    cy.getIframeBody().find('#recaptcha-anchor').click()
    
    // click on Sign up button and assert sign-up is successful
    cy.contains('Sign Up').click({force:true});
    cy.get('.account-created-dialog-container').should('contain', USERS.USERS.firstname).find('p').should('contain', 'Thank you for signing up with our portal. You have full access to our current offerings. You can also finish building your investor profile now or complete it later.')
    
  });
});
