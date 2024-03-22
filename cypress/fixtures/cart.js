import { faker } from "@faker-js/faker"

const fakerNegativeStock = faker.datatype.number({ min: -10, max: -1 }).toString()
const fakerStockSup20 = faker.datatype.number({ min: 20, max: 40 }).toString()

export default { fakerNegativeStock, fakerStockSup20 }