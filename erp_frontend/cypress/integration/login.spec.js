/// <reference types="cypress" />

export default function makeid(length) {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const email = "foo5@bar.com"
const password = "123456789"

context('Login Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/login')
  })

  it('Login success', () => {
    cy.get('input[name="Email"]').type(email).should('have.value', email)
    cy.get('input[name="Password"]').type(password).should('have.value', password)
    cy.get('#loginBtn').click()
    cy.contains('Click this button to be taken to the Administator Page / Operations Manager Page')
  })

  it('Wrong credentials', () => {
    cy.get('input[name="Email"]').type(email).should('have.value', email)
    cy.get('input[name="Password"]').type(password+1).should('have.value', password+1)
    cy.get('#loginBtn').click()
    cy.contains('Username or password is incorrect')
  })
})

context('Dashboard Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/login')
    cy.get('input[name="Email"]').type(email).should('have.value', email)
    cy.get('input[name="Password"]').type(password).should('have.value', password)
    cy.get('#loginBtn').click()
    cy.contains('Click this button to be taken to the Administator Page / Operations Manager Page')
    cy.visit('http://localhost:4000/dashboard')
  })

  it('Vendors Checkout', () => {
    cy.get('div.MuiButtonBase-root:nth-child(2)').click()
    cy.get('tbody.MuiTableBody-root:nth-child(2) > tr:nth-child(1) > td:nth-child(5) > button:nth-child(3)').click()
    cy.contains('CHECKOUT').click()
    cy.contains('0.49')
    cy.get('html body div.makeStyles-popupCheckout-20 div.MuiTableContainer-root.makeStyles-checkoutContainer-23 table.MuiTable-root tfoot.MuiTableFooter-root tr.MuiTableRow-root.MuiTableRow-footer td.MuiTableCell-root.MuiTableCell-footer.MuiTableCell-alignCenter button.MuiButtonBase-root.MuiButton-root.MuiButton-text.makeStyles-checkoutButton-22').click()
  })

  it('Accounting Navigate', () => {
    cy.get('div.MuiButtonBase-root:nth-child(3)').click()
  })
})

