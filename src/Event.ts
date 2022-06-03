export interface Event {
  event: string;
  run (...args: any): unknown;
}