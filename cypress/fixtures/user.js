import { faker } from '@faker-js/faker'

const fakeEmail = faker.internet.email()
const fakePassword = faker.internet.password({ length: 12 })

export default { fakeEmail, fakePassword }