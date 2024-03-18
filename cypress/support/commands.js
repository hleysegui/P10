// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', (username, password) => { 
    const apiLogin = `${Cypress.env("apiUrl")}/login`

    cy.request("POST", apiLogin, {
        "username": username,
        "password": password
    }).then((response) => {
            localStorage.setItem("token", response.body.token)
    });
})

Cypress.Commands.add('logout', () => { 
    localStorage.removeItem("token")
})

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args)
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

