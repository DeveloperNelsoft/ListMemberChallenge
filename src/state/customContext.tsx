import React, { createContext, useReducer, Dispatch } from "react";
import {
  congressMemberReducer,
  CongressMemberActions,
} from "./congressMemberReducer";

import { CongressMember } from "../screens/congressMember/congressMember.interface";

type InitialStateType = {
  congressMembers: CongressMember[];
};

const initialState = {
  congressMembers: [],
};

const AppContext = createContext<{
  state: any;
  dispatch: Dispatch<CongressMemberActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { congressMembers }: InitialStateType,
  action: CongressMemberActions
) => ({
  congressMembers: congressMemberReducer(congressMembers, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };

/*
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
*/
