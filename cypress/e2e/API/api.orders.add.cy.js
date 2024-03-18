let productId
const apiProducts = `${Cypress.env("apiUrl")}/products`
const apiOrdersAdd = `${Cypress.env("apiUrl")}/orders/add`

describe('Get product by ID', () => {
    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    })

    let token = localStorage.getItem("token")

    function getQuantityRandom(max) {
        return Math.floor(Math.random() * max)
    }
    it('Récupérer tous les produits et extraire ID', () => {
        cy.request("GET", apiProducts).then((response) => {
            productId = response.body[Math.floor(Math.random() * response.body.length)].id
        })
    })
    
    it('Ajouter un produit au panier', () => {    
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
            failOnStatusCode: false 
          }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200);
          })
    })
    /*

    it('Ajouter un produit au panier en rupture de stock', () => {
        expect(productId).to.be.a("number")
    
        cy.request({
            method: "POST",
            url: apiOrdersAdd,
            headers: {
                "Authorization": "Bearer " + token
            },
            body: {
                "product": 3,
                "quantity": 1
            },
            failOnStatusCode: false 
          }).then((response) => {
            expect(response.status).to.eq(200);
          })
    }) */
})