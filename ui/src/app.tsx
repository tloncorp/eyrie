import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';
import { useEyreState } from './state/eyre';
import api from './api';

async function init() {
  return api.subscribe({
    app: 'eyrie',
    path: '/every/~s20'
  });
}

export function App() {
  const {
    channel,
    status,
    idStatus,
    facts,
    errors
  } = useEyreState();

  useEffect(() => {
    init();
  }, []);

  const onReset = useCallback(() => {
    api.reset()
    init()
  }, []);

  return (
    <main className="flex justify-center min-h-screen">
      <div className="max-w-xl w-full space-y-6 my-20 p-6 rounded-3xl bg-gray-50">
        <div className='flex space-x-6 justify-between items-end'>
        <h1 className="text-3xl font-bold">eyrie</h1>
        <div className='space-x-2'>
            <strong>channel:</strong>
            <span>{channel}</span>
          </div>  
        </div>
        <h2 className={cn('flex items-center justify-center p-4 font-bold rounded-md', {
          'bg-red-400': status === 'errored',
          'bg-green-400': status === 'active',
          'bg-teal-400': status === 'reconnected',
          'bg-yellow-400': status === 'reconnecting',
          'bg-blue-400': status === 'opening',
          'bg-gray-200': status === 'initial'
        })}>{status}</h2>
        <div className='flex flex-wrap justify-between'>
          <div className='space-x-2'>
            <strong>current id:</strong>
            <span>{idStatus.current}</span>
          </div>
          <div className='space-x-2'>
            <strong>last heard id:</strong>
            <span>{idStatus.lastHeard}</span>
          </div>
          <div className='space-x-2'>
            <strong>last ackd id:</strong>
            <span>{idStatus.lastAcknowledged}</span>
          </div>
        </div>
        <div>
          <button onClick={onReset} className="button bg-orange-300">reset</button>
        </div>
        <div className='space-y-2'>
          <h2 className='font-semibold'>error log:</h2>
          <div className='font-mono bg-gray-100 rounded-md whitespace-nowrap overflow-x-scroll min-h-[48px]'>
            {errors.map((e, i) => (
              <div key={e.time} className="flex items-center py-1 px-2 space-x-2">
                <div>{(new Date(e.time)).toLocaleTimeString()}</div>
                <div>{e.msg}</div>
              </div>
            ))}
          </div>          
        </div>
        <div className='space-y-2'>
          <h2 className='font-semibold'>fact log:</h2>
          <div className='font-mono bg-gray-100 rounded-md whitespace-nowrap overflow-x-scroll'>
            {facts.map((f, i) => (
              <div key={f.time} className="flex items-center py-1 px-2 space-x-4">
                <div className='flex-none w-8 text-right'>{f.id}</div>
                <div className='flex-none w-28'>{(new Date(f.time)).toLocaleTimeString()}</div>
                <div className='flex-1'>{JSON.stringify(f.data)}</div>
              </div>
            ))}
          </div>          
        </div>
      </div>
    </main>
  );
}
