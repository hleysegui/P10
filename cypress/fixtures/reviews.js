import { faker } from '@faker-js/faker'

const titleFaker = faker.lorem.slug()
const commentFaker = faker.lorem.sentences()
const ratingFaker = faker.number.int({min: 0, max:5})

export default { titleFaker, commentFaker, ratingFaker }