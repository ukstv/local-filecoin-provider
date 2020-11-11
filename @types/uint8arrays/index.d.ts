declare module "uint8arrays" {
  export function compare(a: Uint8Array, b: Uint8Array): -1 | 1 | 0;
  export function concat(arrays: Uint8Array[], length?: number): Uint8Array;
  export function equals(a: Uint8Array, b: Uint8Array): boolean;
  export function fromString(input: string, encoding?: string): Uint8Array;
  export function toString(array: Uint8Array, encoding?: string): string;
}
