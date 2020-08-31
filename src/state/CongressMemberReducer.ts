import * as types from "./types";
import { CongressMember } from "../screens/congressMember/congressMember.interface";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Add = "ADD_CONGRESS_MEMBER_LIST",
}

type CongressMemberPayload = {
  [Types.Add]: CongressMember[];
};

export type CongressMemberActions = ActionMap<
  CongressMemberPayload
>[keyof ActionMap<CongressMemberPayload>];

export const congressMemberReducer = (
  state: CongressMember[],
  action: CongressMemberActions
) => {
  switch (action.type) {
    case types.ADD_CONGRESS_MEMBER_LIST:
      return { ...state, congressMembers: action.payload };
    default:
      return state;
  }
};
