const apiOrders = `${Cypress.env("apiUrl")}/orders`
const apiOrdersAdd = `${Cypress.env("apiUrl")}/orders/add`
const apiProducts = `${Cypress.env("apiUrl")}/products`
const token = localStorage.getItem("user")
let productId

describe('Test order API', () => {
    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    })

    it('should throw error 401 when user are not login', () => {
        cy.logout()
        cy.wait(2000)
        
        cy.request({
            method: "GET",
            url: apiOrders,
            failOnStatusCode: false 
          }).then((response) => {
            expect(response.status).to.eq(401);
          })
    })

    it('return the list of cart', () => {
        
        cy.request({
            method: "GET",
            url: apiOrders,
            headers: {
                "Authorization": "Bearer " + token
            },
            failOnStatusCode: true 
          }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
          })
    })

    function getQuantityRandom(max) {
        return Math.floor(Math.random() * max)
    }

    it('get random product and get id', () => {

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

    it('add random product to the cart available', () => {    

        cy.request({
            method: "POST",
            url: apiOrdersAdd,
            headers: {
                "Authorization": "Bearer " + token
            },
            body: {
                "product": productId,
                "quantity": getQuantityRandom(3)
            },
            failOnStatusCode: true 
          }).then((response) => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
          })
    }) 

    it('add product to the cart not available', () => {    

        cy.request({
            method: "PUT",
            url: apiOrdersAdd,
            headers: {
                "Authorization": "Bearer " + token
            },
            body: {
                "product": 3,
                "quantity": getQuantityRandom(3)
            },
            failOnStatusCode: true 
          }).then((response) => {
            expect(response.status).to.eq(403)
            cy.log(JSON.stringify(response.body))
          })
    }) 
})