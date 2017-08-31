function makeMockTextMessage(fromMe, content) {
  return {
    header: { fromMe, type: "text" },
    body: { content }
  }
}

function makeMockLinkMessage(to, title) {
  return {
    header: { type: "link" },
    body: { to, title }
  }
}

const introMessages = [
  "Hej och välkommen! Jag är Hedvig och kommer alltid finnas tillgänglig här för dig.",
  "Nu kommer jag förklara hur enkelt det är att försäkra sig med Hedvig.",
  "Först...",
  "Sedan...",
  "Nu vet du vet jag är, för att jag ska veta vem du är behöver du logga in med BankID."
]
  .map((message, i) => makeMockTextMessage(false, message))
  .concat(makeMockLinkMessage("Login", "Logga in"))

const onboardingMessages = [
  "Snyggt Fredrik!",
  "För att kunna föreslå den bästa försäkringen för dig är så kommer jag ställa några frågor",
  "Bor du i hyresrätt eller äger du din bostad?"
]
  .map((message, i) => makeMockTextMessage(false, message))
  .concat(
    [
      "Jag äger min bostad",
      "Är det en ville eller lägenhet?",
      "Lägenhet",
      "Fråga...",
      "Svar...",
      "Tryck här för att lägga till värdesaker"
    ].map((message, i) => makeMockTextMessage(i % 2 === 0, message))
  )
  .concat(makeMockLinkMessage("AddEditItem", "Lägg till värdesaker"))
  .concat(
    [
      "Tack, då tror jag att jag har tillräckligt för nu. Tryck här för att se ditt erbjudande."
    ].map((message, i) => makeMockTextMessage(i % 2 !== 0, message))
  )
  .concat(makeMockLinkMessage("InsuranceOffer", "Se erbjudande"))

const claimMessages = [
  "Hi! It seems like you have a claim to report. I'm here to help you. What happend?",
  "I lost my wallet on the subway.",
  "I'm sorry to hear that. Did you see the person who stole your wallet?",
  "Yes",
  "Ok, what valueables did you have in your wallet?",
  "An SL card and 500 sek",
  "Ok, I'll tranfer 1800 to you right away."
].map((message, i) => makeMockTextMessage(i % 2 !== 0, message))

const mockData = {
  GET: {
    "/me": {
      data: {
        name: "Pascal"
      }
    },
    "/insurance": {
      data: {
        foo: "bar"
      }
    },
    "/messages/intro": {
      data: introMessages
    }
  },
  POST: {
    "/claim": {
      data: {
        foo: "bar"
      }
    },
    "/onboarding": {
      data: onboardingMessages
    }
  },
  claimMessages
}

export default mockData
