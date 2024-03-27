let productId
const apiProducts = `${Cypress.env("apiUrl")}/products`
const token = localStorage.getItem("user")

describe('Test product', () => {

    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    })
    it('get random id product', () => {
        cy.request("GET", apiProducts).then((response) => {
            productId = response.body[Math.floor(Math.random() * response.body.length)].id
        })
        cy.request({
            method: 'GET',
            url: apiProducts,
            headers: {
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            productId = response.body[Math.floor(Math.random() * response.body.length)].id
        })
    })
    
    it('return details of specific product', () => {
        
        expect(productId).to.be.a("number")

        cy.request({
            method: 'GET',
            url: apiProducts + `/${productId}`,
            headers: {
                "Authorization": "Bearer " + token
            },
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            })
    })
})