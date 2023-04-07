import { Eyrie } from "eyrie";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tlon-eyrie': CustomElement<Eyrie>;
    }
  }
}

export {}