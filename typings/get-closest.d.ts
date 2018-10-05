declare module 'get-closest' {
  interface GetClosest {
    number: (test: number, values: number[]) => number;
  }

  const getClosest: GetClosest;

  export default getClosest;
}
