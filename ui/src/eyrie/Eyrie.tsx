import cn from 'classnames';
import React from 'react';
import { Fact, useEyreState } from '../state/eyre';
import * as Accordion from '@radix-ui/react-accordion';
import { Subscription } from './Subscription';

function filterFacts(facts: Fact[], id: number) {
  return facts.filter(f => {
    try {
      const data = JSON.parse(f.data);

      if ('id' in data) {
        return data.id === id;
      }

      return false;
    } catch (error) {
      return false;
    }
  })
}

export function Eyrie() {
  const {
    channel,
    status,
    idStatus,
    facts,
    subscriptions,
    errors,
    onReset
  } = useEyreState();
  
  return (
    <div className="flex flex-col h-full w-full space-y-6 p-6 rounded-3xl bg-gray-50">
      <div className='flex space-x-6 justify-between items-center'>
      <button onClick={onReset} className="button bg-orange-300">reset</button>
      <div className='flex items-center space-x-2'>
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
          <strong>last sent id:</strong>
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
      <hr />
      <Accordion.Root type='multiple' className='space-y-2'>
        <Accordion.Item value='error'>
          <Accordion.Header>
            <Accordion.Trigger className='flex items-center justify-between w-full p-2 space-x-3 rounded-md bg-gray-200'>
              <strong>error log</strong>
              <span>{errors.length}</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className='py-2'>
            <div className='font-mono bg-gray-100 rounded-md whitespace-nowrap overflow-scroll min-h-[48px] max-h-96'>
              {errors.map((e, i) => (
                <div key={e.time} className="flex items-center py-1 px-2 space-x-2">
                  <div>{(new Date(e.time)).toLocaleTimeString()}</div>
                  <div>{e.msg}</div>
                </div>
              ))}
            </div>      
          </Accordion.Content> 
        </Accordion.Item>           
      </Accordion.Root>
      <div className='max-h-96 overflow-y-auto'>
        <Accordion.Root type='multiple' className='space-y-2'>
          {Object.values(subscriptions).map(sub => <Subscription key={sub.id} sub={sub} facts={filterFacts(facts, sub.id)} />)}
        </Accordion.Root>
      </div>
    </div>
  )
}