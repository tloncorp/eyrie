import React, { useCallback, useEffect, useRef } from 'react';
import api from './api';
import './eyrie';
import { Eyrie } from './eyrie';

async function init(duration: string, id?: number) {
  if (id) {
    api.unsubscribe(id)
  }

  return api.subscribe({
    app: 'eyrie',
    path: `/every/${duration}`,
    quit: () => {
      console.log('quitting')
      init(duration);
    }
  });
}

export function App() {
  const sub = useRef<{ id: number, id2: number, loading: boolean }>({ id: 0, id2: 0, loading: false });
  const eyrie = useRef<Eyrie>(null);

  const onReset = useCallback(() => {
    console.log('on reset')
    api.reset()
    init('~s5')
    init('~s7')
  }, []);

  useEffect(() => {
    async function start() {
      eyrie.current?.init({ api, onReset });
      sub.current.loading = true;
      sub.current.id = await init('~s5', sub.current.id);
      sub.current.id2 = await init('~s7', sub.current.id2);
      sub.current.loading = false;
    }

    if (!sub.current.loading) {
      start();
    }
  }, []);

  return (
    <main className="flex justify-center min-h-screen py-20">
      <tlon-eyrie ref={eyrie} class='fixed bottom-4 right-4' />
    </main>
  );
}
