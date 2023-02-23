import produce from "immer";
import { create } from "zustand";

type ChannelStatus = 'initial' | 'opening' | 'active' | 'reconnecting' | 'errored';

interface Fact {
  id: number;
  time: number;
  data: any;
}

interface AnError {
  time: number;
  msg: string;
}

interface IdStatus {
  current: number;
  lastHeard: number;
  lastAcknowledged: number;
}

interface EyreState {
  channel: string;
  status: ChannelStatus;
  facts: Fact[];
  errors: AnError[];
  idStatus: IdStatus;
  update: (status: ChannelStatus) => void;
  idUpdate: (status: Partial<IdStatus>) => void;
  reset: (newChannel: string) => void; 
  logFact: (fact: Fact) => void;
  logError: (err: AnError) => void;
}

export const useEyreState = create<EyreState>((set, get) => ({
  channel: '',
  status: 'initial',
  idStatus: {
    current: 0,
    lastHeard: -1,
    lastAcknowledged: -1
  },
  facts: [],
  errors: [],
  reset(newChannel) {
    set(produce((draft: EyreState) => {
      draft.channel = newChannel;
      draft.status = 'initial';
      draft.idStatus = {
        current: 0,
        lastHeard: -1,
        lastAcknowledged: -1
      }
      draft.facts = [];
      draft.errors = [];
    }))
  },
  update(status) {
    set(produce((draft: EyreState) => {
      draft.status = status;
    }))
  },
  idUpdate(status) {
    set(produce((draft: EyreState) => {
      draft.idStatus = {
        ...draft.idStatus,
        ...status
      }
    }))
  },
  logFact(fact) {
    set(produce((draft: EyreState) => {
      draft.facts.unshift(fact);
    }))
  },
  logError(err) {
    set(produce((draft: EyreState) => {
      draft.errors.unshift(err)
    }))
  }
}));