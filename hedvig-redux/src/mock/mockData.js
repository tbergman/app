function makeMockTextMessage(fromMe, content) {
  return {
    header: { fromMe, type: "text" },
    body: { content }
  }
}

function makeMockLinkMessage(to) {
  return {
    header: { type: "link" },
    body: { to }
  }
}

const welcomeMessages = [
  "Hej och välkommen! Jag är Hedvig och kommer alltid finnas tillgänglig här för dig.",
  "Nu kommer jag förklara hur enkelt det är att försäkra sig med Hedvig.",
  "Först...",
  "Sedan...",
  "Nu vet du vet jag är, för att jag ska veta vem du är behöver du logga in med BankID."
]
  .map((message, i) => makeMockTextMessage(false, message))
  .concat(makeMockLinkMessage("Login"))

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
    "/messages": {
      data: [
        {
          header: { fromMe: false, type: "text" },
          body: {
            content: "Hello"
          }
        }
      ]
    }
  },
  POST: {
    "/claim": {
      data: {
        foo: "bar"
      }
    }
  },
  welcomeMessages,
  claimMessages
}

export default mockData
