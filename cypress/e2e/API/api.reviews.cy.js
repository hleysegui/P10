import { titleFaker, commentFaker, ratingFaker } from '../../fixtures/reviews.js'

const token = localStorage.getItem("user")
const apiReviews = `${Cypress.env("apiUrl")}/reviews`

beforeEach(() => {
    cy.login('test2@test.fr', 'testtest')
})



it('add a review', () => {  
     
    cy.request({
        method: "POST",
        url: apiReviews,
        headers: {
            "Authorization": "Bearer " + token
        },
        body: {
            "title": titleFaker,
            "comment": commentFaker,
            "rating": ratingFaker
        },
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
      })
})