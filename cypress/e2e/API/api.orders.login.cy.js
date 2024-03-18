const apiOrders = `${Cypress.env("apiUrl")}/orders`

describe('Test API orders', () => {
    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    });

    it("gets orders when user login", () => {
        let token = localStorage.getItem("token")
        
        cy.request({
            method: "GET",
            url: apiOrders,
            headers: {
                "Authorization": "Bearer " + token
            },
            failOnStatusCode: true 
          }).then((response) => {
            expect(response.status).to.eq(200);
          })
    })
}) 