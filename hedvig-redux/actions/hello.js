export function hello(name) {
  return {
    type: 'HELLO',
    payload: {
      name,
    },
  };
}

export default {
  hello,
};
