describe('Test product page', () => {
    it('show products exists on homepage and data by products', () => {
        cy.visit('/')
        cy.getBySel('product-home').each(() => {
            cy.getBySel('product-home-img').should('exist')
            cy.getBySel('product-home-name').should('exist')
            cy.getBySel('product-home-ingredients').should('exist')
            cy.getBySel('product-home-link').should('exist')
            cy.getBySel('product-home-price').should('exist')

            let k = 0
            
            cy.getBySel('product-home-link').each(($button) => {
                $button.click()
                k += 1
            }).then(() => {
                cy.getBySel('detail-product-img').should('exist')
                cy.getBySel('detail-product-name').should('exist')
                cy.getBySel('detail-product-description').should('exist')
                cy.getBySel('detail-product-skin').should('exist')
                cy.getBySel('detail-product-aromas').should('exist')
                cy.getBySel('detail-product-ingredients').should('exist')
                cy.getBySel('detail-product-price').should('exist')
                cy.getBySel('detail-product-stock').should('exist')
                cy.getBySel('detail-product-add').should('exist')
                cy.getBySel('detail-product-quantity').should('exist')
                cy.go('back')
            })
        })
    })
})