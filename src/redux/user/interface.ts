export enum UserActionsTypes {
  RATE_APP = 'RATE_APP',
  SENT_INVITE = 'SENT_INVITE',
}

export interface RateApp {
  type: typeof UserActionsTypes.RATE_APP;
}

export interface SentInviteToFriends {
  type: typeof UserActionsTypes.SENT_INVITE;
}

export type UserActions = RateApp | SentInviteToFriends;
