const apiOrders = `${Cypress.env("apiUrl")}/orders`

context("GET /orders", () => {
    it("gets orders when user not login", () => {
        cy.request({
            method: "GET",
            url: apiOrders ,
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(403);
        })
    })
})