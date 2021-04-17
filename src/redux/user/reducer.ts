import { UserActions, UserActionsTypes } from './interface';

export interface UserState {
  ratedAppAt: number | null;
  hasSentInvite: boolean;
}

const initialState: UserState = {
  ratedAppAt: null,
  hasSentInvite: false,
};

export const user = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionsTypes.RATE_APP:
      return { ...state, ratedAppAt: Date.now() };
    case UserActionsTypes.SENT_INVITE:
      return { ...state, hasSentInvite: true };
    default:
      return state;
  }
};
