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

const messages = [
  "Hej och välkommen! Det här är en demo-app. För att se nästa meddelande, tryck på detta eller något annat meddelande.",
  "Jag är Hedvig och kommer alltid finnas tillgänglig här för dig.",
  "Nu kommer jag förklara hur enkelt det är att försäkra sig med Hedvig.",
  "Först...",
  "Sedan...",
  "Nu vet du vet jag är, för att jag ska veta vem du är behöver du logga in med BankID."
]
  .map((message) => makeMockTextMessage(false, message))
  .concat(makeMockLinkMessage("Login", "Logga in"))

const onboardingMessages = [
  "Snyggt Fredrik!",
  "För att kunna föreslå den bästa försäkringen för dig är så kommer jag ställa några frågor",
  "Bor du i hyresrätt eller äger du din bostad?"
]
  .map((message) => makeMockTextMessage(false, message))
  .concat(
    [
      "Jag äger min bostad",
      "Är det en villa eller lägenhet?",
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
  "Hej! Har något hänt eller behöver du hjälp med något?",
  "Ja, min plånbok har blivit stulen på tunnelbanan.",
  "Tråkigt att höra, men jag kommer göra mitt bästa för att hjälpa dig. Såg du den som stal plånboken?",
  "Ja",
  "...",
  "...",
  "Jag kommer be dig spela in en kort videoredogörelse för händelsen.",
  "Film skickad...",
  "Tack! Vi kommer titta på ditt ärende och hålla dig uppdatera här i chatten. Är det något mer vi kan hjälpa till med nu?",
  "Nej, det blir bra.",
  "Vi har tittat på ditt ärende och kommer föra över 1500 kr."
]
  .map((message, i) => makeMockTextMessage(i % 2 !== 0, message))
  .concat(makeMockLinkMessage("Feedback", "Ge Feedback"))

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
    "/messages": {
      data: messages
    },
    "/mock-messages/claim": {
      data: claimMessages
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
  }
}

export default mockData
