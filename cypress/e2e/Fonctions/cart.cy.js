import { fakerNegativeStock, fakerStockSup20 } from "../../fixtures/cart"
const token = localStorage.getItem('user')
const apiOrders = `${Cypress.env("apiUrl")}/orders`
const apiUpdateQuantity = `${Cypress.env("apiUrl")}/orders`
let idCart

describe('Test Cart', () => {
    beforeEach(() => {
        cy.login('test2@test.fr', 'testtest')
    })

     it('Add products not available in stock to cart and check stock', () => {
        cy.visit('http://localhost:8080/#/products/3')

        cy.getBySel('detail-product-stock')
            .invoke('text')
            .should('match', /(0|[1-9][0-9]*) en stock$/)
                .then((text) => {
                const stock = text.trim()
                const quantityStock = parseInt(stock.match(/^-?\d+/))
                cy.log(`stock initial : ${quantityStock}`)

                if(quantityStock <= 1) {
                    throw new Error("can not add to cart because stock not enough")
                } else {
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

    it('Add products available in stock to cart and check stock', () => {
        cy.visit('http://localhost:8080/#/products/5')

        cy.getBySel('detail-product-stock')
            .invoke('text')
            .should('match', /(0|[1-9][0-9]*) en stock$/)
                .then((text) => {
                const stock = text.trim()
                const quantityStock = parseInt(stock.match(/^-?\d+/))
                cy.log(`stock initial : ${quantityStock}`)

                if(quantityStock <= 1) {
                    throw new Error("can not add to cart because stock not enough")
                } else {
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

    it('check limit with negative quantity', () => {
        cy.visit('http://localhost:8080/#/products')

        cy.getBySel('product-link')
                .then((link) => {
                    const nbProduct = Cypress.$(link).length
                    cy.getBySel('product-link').should('have.length', nbProduct)
                        .its('length')
                        .then((n) => Cypress._.random(0, n-1))
                        .then((k) => {
                            cy.getBySel('product-link').eq(k).click({force: true})
                            cy.getBySel('detail-product-quantity').clear()
                            cy.getBySel('detail-product-quantity').type(fakerNegativeStock)
                            cy.getBySel('detail-product-form').should('have.class', 'ng-invalid')   
                        })
                }) 
    })

    it('check limit with positive quantity greater than 20', () => {
        cy.visit('http://localhost:8080/#/products')

        cy.getBySel('product-link')
                .then((link) => {
                    const nbProduct = Cypress.$(link).length
                    cy.getBySel('product-link').should('have.length', nbProduct)
                        .its('length')
                        .then((n) => Cypress._.random(0, n-1))
                        .then((k) => {
                            cy.getBySel('product-link').eq(k).click({force: true})
                            cy.getBySel('detail-product-quantity').clear()
                            cy.getBySel('detail-product-quantity').type(fakerStockSup20)
                            cy.getBySel('detail-product-form').should('have.class', 'ng-invalid')
                        })
                }) 
    })

    it('check with quantity 0', () => {
        cy.visit('http://localhost:8080/#/products')

        cy.getBySel('product-link')
                .then((link) => {
                    const nbProduct = Cypress.$(link).length
                    cy.getBySel('product-link').should('have.length', nbProduct)
                        .its('length')
                        .then((n) => Cypress._.random(0, n-1))
                        .then((k) => {
                            cy.getBySel('product-link').eq(k).click({force: true})
                            cy.getBySel('detail-product-quantity').clear()
                            cy.getBySel('detail-product-quantity').type(0)
                            cy.getBySel('detail-product-form').should('have.class', 'ng-invalid')   
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
                                    }).its('body.orderLines').then((list) => {
                                        expect(Cypress._.last(list).product.id).to.equal(id)
                                        idCart = list[0].id
                                        
                                    })
                            })
                        })
                })            
    }) 
    
    it('change product quantity', () => {
        cy.request({
            method: "PUT", 
            url: apiUpdateQuantity + `/${idCart}/change-quantity`,
            headers: {
                "Authorization" : "Bearer " + token
            },
            body: {
                'quantity' : 2
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})