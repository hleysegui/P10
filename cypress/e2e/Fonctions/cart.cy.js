import { fakerNegativeStock, fakerStockSup20 } from "../../fixtures/cart"
const token = localStorage.getItem('user')
const apiOrders = `${Cypress.env("apiUrl")}/orders`

describe('Test Cart', () => {
    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    })

    it('Add products to cards and check stock', () => {
        cy.visit('http://localhost:8080/#/products')

        cy.getBySel('product-link')
                .then((link) => {
                    const nbProduct = Cypress.$(link).length
                    cy.getBySel('product-link').should('have.length', nbProduct)
                        .its('length')
                        .then((n) => Cypress._.random(0, n-1))
                        .then((k) => {
                            cy.getBySel('product-link').eq(k).click({force: true})
                            cy.getBySel('detail-product-stock')
                                .invoke('text')
                                .should('match', /^-?(0|[1-9][0-9]*) en stock$/)
                                    .then((text) => {
                                    const stock = text.trim()
                                    const quantityStock = parseInt(stock.match(/\d+/))
                                    cy.log(`stock initial : ${quantityStock}`)

                                    if(quantityStock <= 1) {
                                        cy.log('can not add to cart because stock not enough')
                                    } 
                                    else {
                                        cy.getBySel('detail-product-add').click()
                                        cy.get('#cart-content').should('exist')
                                        cy.go('back')
                                        const newQuantityStock = quantityStock - 1
                                        cy.getBySel('detail-product-stock')
                                            .invoke('text')
                                            .should('match', new RegExp(`^${newQuantityStock} en stock$`))
                                        cy.log(`stock after add to cart : ${newQuantityStock}`)

                                        cy.visit('http://localhost:8080/#/cart')
                                        cy.getBySel('cart-line-delete').click({multiple: true})
                                    }
                                })
                        })
                })        
    })

    it('check limit with negative stock number', () => {
        cy.visit('http://localhost:8080/#/products')

        cy.getBySel('product-link')
                .then((link) => {
                    const nbProduct = Cypress.$(link).length
                    cy.getBySel('product-link').should('have.length', nbProduct)
                        .its('length')
                        .then((n) => Cypress._.random(0, n-1))
                        .then((k) => {
                            cy.getBySel('product-link').eq(k).click({force: true})
                            cy.getBySel('detail-product-quantity').type(fakerNegativeStock)
                            cy.getBySel('detail-product-form').should('have.class', 'ng-invalid')   
                        })
                }) 
    })

    it('check limit with positive stock number', () => {
        cy.visit('http://localhost:8080/#/products')

        cy.getBySel('product-link')
                .then((link) => {
                    const nbProduct = Cypress.$(link).length
                    cy.getBySel('product-link').should('have.length', nbProduct)
                        .its('length')
                        .then((n) => Cypress._.random(0, n-1))
                        .then((k) => {
                            cy.getBySel('product-link').eq(k).click({force: true})
                            cy.getBySel('detail-product-quantity').type(fakerStockSup20)
                            cy.getBySel('detail-product-form').should('have.class', 'ng-valid')
                        })
                }) 
    })

    it('add product in cart and check via API', () => {

        cy.visit('http://localhost:8080/#/products')
        let id 

        cy.getBySel('product-link')
                .then((link) => {
                    const nbProduct = Cypress.$(link).length
                    cy.getBySel('product-link').should('have.length', nbProduct)
                        .its('length')
                        .then((n) => Cypress._.random(0, n-1))
                        .then((k) => {
                                cy.getBySel('product-link').eq(k).click({force: true})
                                cy.url().then(url => {
                                    const segment = url.split('/')
                                    id = parseInt(segment[segment.length - 1])
                                    cy.log(id)
        
                                    cy.getBySel('detail-product-add').should('exist')
                                    cy.wait(2000)
                                    cy.getBySel('detail-product-add').click()
        
                                    cy.request({
                                        method: "GET",
                                        url: apiOrders,
                                        headers: {
                                            "Authorization" : "Bearer " + token,
                                        },
                                        failOnStatusCode: true 
                                    }).then((response) => {
                                        cy.log(response.body.orderLines[0].product.id)
                                        const idOrder = response.body.orderLines[0].product.id
                                        expect(idOrder).to.equal(id)
                                        
                                    })
                            })
                        })
                })
                cy.visit('http://localhost:8080/#/cart')
                cy.getBySel('cart-line-delete').click({ multiple: true })               
    })

})