function hello(name) {
  return {
    type: "HELLO",
    payload: {
      name
    }
  }
}

module.exports = {
  hello
}
