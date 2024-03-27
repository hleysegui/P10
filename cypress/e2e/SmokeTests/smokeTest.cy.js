describe('smoke test', () => {
    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    })

    afterEach(() =>(
        cy.logout()
    ))
    it('check existing button add to cart when user is login', () => {
        cy.visit('http://localhost:8080/#/products/3')
        cy.get('[data-cy="detail-product-add"]').should('exist')
    })

    it('check existing field product available', () => {
        cy.visit('http://localhost:8080/#/products/3')
        cy.get('[data-cy="detail-product-stock"]').should('exist')
        cy.get('[data-cy="detail-product-quantity"]').should('exist')
    })
}) 

it('check field on form login', () => {
    cy.visit('http://localhost:8080/#/login')
    cy.get('[data-cy="login-input-username"]').should('exist')
    cy.get('[data-cy="login-input-password"]').should('exist')
    cy.get('[data-cy="login-submit"]').should('exist')
})