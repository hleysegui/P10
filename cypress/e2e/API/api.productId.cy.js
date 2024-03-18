let productId
const apiProducts = `${Cypress.env("apiUrl")}/products`

describe('Get product by ID', () => {
    it('Récupérer tous les produits et extraire ID', () => {
        cy.request("GET", apiProducts).then((response) => {
            productId = response.body[Math.floor(Math.random() * response.body.length)].id
        })
    })
    
    it('Doit retourner la fiche du produit', () => {
        expect(productId).to.be.a("number")
    
        cy.request(apiProducts + `/${productId}`)
            .then((response) => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            })
    })
})