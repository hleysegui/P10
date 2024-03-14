describe('Moke test cart and product available', () => {
    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    })

    afterEach(() =>(
        cy.logout()
    ))
    it('vérifiez la présence des boutons d’ajout au panier quand vous êtes connecté', () => {
        cy.visit('http://localhost:8080/#/products/3')
        cy.get('[data-cy="detail-product-add"]').should('exist')
    })

    it('vérifiez la présence du champ de disponibilité du produit', () => {
        cy.visit('http://localhost:8080/#/products/3')
        cy.get('[data-cy="detail-product-stock"]').should('exist')
        cy.get('[data-cy="detail-product-quantity"]').should('exist')
    })
}) 