declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GRILL: any; // You can replace `unknown` with the specific type if you know the type of GRILL
  }
}
export {};
