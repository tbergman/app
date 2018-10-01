const typeDefs = `
  type Insurance {
    address: String
    monthlyCost: Int
    safetyIncreasers: [String!]
    personsInHousehold: Int
    certificateUrl: String
    status: InsuranceStatus
    type: InsuranceType
    activeFrom: LocalDate
    insuredAtOtherCompany: Boolean

    perilCategories: [PerilCategory]
  }

  type PerilCategory {
    title: String
    description: String
    iconUrl: String
    perils: [Peril]
  }

  type Peril {
    id: ID
    title: String
    imageUrl: String
    description: String
  }

  enum InsuranceStatus {
    PENDING
    ACTIVE
    INACTIVE
    INACTIVE_WITH_START_DATE
    TERMINATED
  }

  enum InsuranceType {
    RENT
    BRF
    STUDENT_RENT
    STUDENT_BRF
  }

  type Cashback {
    id: ID
    name: String
    imageUrl: String
  }

  type Query {
    insurance: Insurance!
    cashback: Cashback!
  }

  input SendEventInput {
    type: String
    value: String
  }

  type Mutation {
    logout: Boolean
    sendEvent(event: SendEventInput): Boolean
  }

  scalar LocalDate
`;

export { typeDefs };
