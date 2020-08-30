import { useReducer } from "react";
import * as types from "./types";
import { CongressMember } from "../screens/congressMember/congressMember.interface";

const initialState = {
  congressMember: [
    {
      id: "",
      title: "",
      short_title: "",
      api_uri: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      date_of_birth: "",
      gender: "",
      party: "",
      leadership_role: "",
      twitter_account: "",
      facebook_account: "",
      youtube_account: "",
      govtrack_id: "",
      cspan_id: "",
      votesmart_id: "",
      icpsr_id: "",
      crp_id: "",
      google_entity_id: "",
      fec_candidate_id: "",
      url: "",
      rss_url: "",
      contact_form: "",
      in_office: false,
      cook_pvi: "",
      dw_nominate: 0,
      ideal_point: "",
      seniority: "",
      next_election: "",
      total_votes: 0,
      missed_votes: 0,
      total_present: 0,
      last_updated: "",
      ocd_id: "",
      office: "",
      phone: "",
      fax: "",
      state: "",
      senate_class: "",
      state_rank: "",
      lis_id: "",
      missed_votes_pct: 0,
      votes_with_party_pct: 0,
      votes_against_party_pct: 0,
    },
  ],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.GET_CONGRESS_MEMBER:
      return {
        ...state,
        congressMember: action.data,
      };
    case types.ADD_CONGRESS_MEMBER:
      return {
        ...state,
        congressMember: [...state.congressMember, action.data],
      };
    case types.UPDATE_CONGRESS_MEMBER:
      return {
        ...state,
        congressMember: action.data,
      };
    case types.DELETE_CONGRESS_MEMBER:
      return {
        ...state,
        congressMember: action.data,
      };
    case types.LOADING:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default function useCongressMemberReducer() {
  const [store, dispatch] = useReducer(reducer, initialState);
  return [store, dispatch];
}
