import { fakeEmail, fakePassword } from "../../fixtures/user"
const apiLogin = `${Cypress.env("apiUrl")}/login`


describe('Login test', () => {
    it('user exist', () => {
        cy.request({
            method: "POST",
            url: apiLogin,
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(200);
          }) 
    })

    it('user not exist', () => {
        cy.request({
            method: "POST",
            url: apiLogin,
            body: {
                username: fakeEmail,
                password: fakePassword
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(401);
          }) 
    })
}) 