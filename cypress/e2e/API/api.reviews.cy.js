import { review } from '../../fixtures/reviews.js'

const apiReviews = `${Cypress.env("apiUrl")}/reviews`

beforeEach(() => {
    cy.login('test2@test.fr', 'testtest')
})

let token = localStorage.getItem("token")

it('Ajouter un avis', () => {  
    cy.fixture('review').then((data) => {
        cy.log(data.titleFaker)
    }) 
    /*cy.request({
        method: "POST",
        url: apiReviews,
        headers: {
            "Authorization": "Bearer " + token
        },
        body: {
            "title": review.titleFaker,
            "comment": review.commentFaker,
            "rating": review.ratingFaker
        },
        failOnStatusCode: false 
      }).then((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200);
      })*/
})