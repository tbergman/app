function makeMockMessage(fromMe, content) {
  return {
    header: { fromMe, type: "text" },
    body: { content }
  }
}

const claimMessages = [
  "Hi! It seems like you have a claim to report. I'm here to help you. What happend?",
  "I lost my wallet on the subway.",
  "I'm sorry to hear that. Did you see the person who stole your wallet?",
  "Yes",
  "Ok, what valueables did you have in your wallet?",
  "An SL card and 500 sek",
  "Ok, I'll tranfer 1800 to you right away."
].map((message, i) => makeMockMessage(i % 2 !== 0, message))

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
  claimMessages
}

export default mockData
