# eyrie
An app for testing the validity of %eyre and our %eyre client, [@urbit/http-api]

https://user-images.githubusercontent.com/5466421/230662895-b3117f90-272b-43df-ab51-78836654b9ad.mp4

## Requirements
Currently **eyrie** requires at least version `2.4.3-debug` of [@urbit/http-api] to work.

## Getting Started

To install **eyrie**

```bash
npm install @tloncorp/eyrie
```

Then import:

```javascript
import '@tloncorp/eyrie'
```

and now you can use anywhere you would a normal HTML element:

```html
<tlon-eyrie />
```

You must pass **eyrie** your instance of the [@urbit/http-api] client so that it can listen to what's happening in the client, by calling the `init` method on the element:

```javascript
//...
const api = new Urbit(...)
const eyrie = document.querySelector('tlon-eyrie');
eyrie.init({ api, onReset: () => ... }); 
//...
```

### React Example
If you're using React here's a full example of how it can be used as a component you can include anywhere in your app:

```tsx
import React, { useEffect, useRef } from 'react';
import '@tloncorp/eyrie';
import { Eyrie as Eyr } from '@tloncorp/eyrie';
import api from '@/api';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'tlon-eyrie': any;
    }
  }
}

export default function Eyrie() {
  const ref = useRef<Eyr>(null);

  useEffect(() => {
    ref.current?.init({ api });
  }, []);

  return <tlon-eyrie ref={ref} class="fixed bottom-4 right-4" />;
}
```

### Desk

The desk currently contains a minimal gall agent for testing subscriptions. It responds to any subscriptions at the path `/every/{duration}` with a subscription that will give facts at every time interval given from the duration. The duration should be in the format of a typical `@dr` like `~s20`.

### UI

**eyrie** is mainly a [React] app which is wrapped inside a web component for ease of distribution to any web app regardless of framework and for encapsulation purposes so that we aren't polluting or getting polluted by the outside environment. We use [Vite] as both a way to serve an example UI for testing the component, but also to bundle the component for distribution.

[react]: https://reactjs.org/
[vite]: https://vitejs.dev/
[@urbit/http-api]: https://github.com/urbit/js-http-api
