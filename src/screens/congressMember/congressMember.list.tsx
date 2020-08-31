import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ReactLoading from "react-loading";

import { CongressMember } from "./congressMember.interface";
import { AppContext } from "../../state/customContext";
import { Types } from "../../state/congressMemberReducer";
import getAxios from "../../apiConnector/apiConnector";
import { format } from "date-fns";

interface CongressMemberListState {
  CongressMemberList: CongressMember[];
  loading: Boolean;
}

interface CongressMemberTableProps {}

const CongressMemberList: React.SFC<CongressMemberListState> = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const urlBackend = `https://api.propublica.org/congress/v1/116/senate/members.json`;
    getAxios
      .instance("")
      .get(urlBackend)
      .then((result: any) => result.data)
      .then((responseData: any) => {
        dispatch({
          type: Types.Fetch,
          payload: responseData.results[0].members as CongressMember[],
        });
      });
  }, []);

  const configContent = () => {
    let content = <ReactLoading type="bubbles" color="blue" />;

    const tableIcons = {
      Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <AddBox {...props} ref={ref} />
      )),
      Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <Check {...props} ref={ref} />
      )),
      Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <Clear {...props} ref={ref} />
      )),
      Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <DeleteOutline {...props} ref={ref} />
      )),
      DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <Edit {...props} ref={ref} />
      )),
      Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <SaveAlt {...props} ref={ref} />
      )),
      Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <FilterList {...props} ref={ref} />
      )),
      FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <FirstPage {...props} ref={ref} />
      )),
      LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <LastPage {...props} ref={ref} />
      )),
      NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <ChevronRight {...props} ref={ref} />
      )),
      PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <Clear {...props} ref={ref} />
      )),
      Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <Search {...props} ref={ref} />
      )),
      SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <ArrowUpward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
        <ViewColumn {...props} ref={ref} />
      )),
    };

    if (state.congressMembers.congressMembers !== undefined) {
      content = (
        <Paper>
          <MaterialTable
            columns={[
              { title: "Id", field: "id" },
              { title: "First name", field: "first_name" },
              { title: "Last name", field: "last_name" },
              { title: "Gender", field: "gender" },
              {
                title: "Date of birth",
                field: "date_of_birth",
                render: (rowData) => (
                  <div>
                    {format(new Date(rowData.date_of_birth), "dd/MM/yyyy")}
                  </div>
                ),
              },
              { title: "State", field: "state" },
              { title: "Role", field: "leadership_role" },
              {
                title: "Action",
                render: (rowData) => (
                  <Link to={`/congressMemberDetail/${rowData.id}`}>
                    detail view
                  </Link>
                ),
              },
            ]}
            icons={tableIcons}
            data={state.congressMembers.congressMembers}
            title=""
            localization={{
              body: {
                emptyDataSourceMessage: "congressMember dont have",
              },
              // toolbar: {
              //   searchTooltip: "Search",
              //   searchPlaceholder: "Search",
              // },
              pagination: {
                labelRowsSelect: "per page",
                labelDisplayedRows: "{from} of {to} | {count} member",
                firstTooltip: "Begin",
                previousTooltip: "Before",
                nextTooltip: "Next",
                lastTooltip: "Final",
              },
            }}
            options={{
              pageSize: 7,
              pageSizeOptions: [21, 70, 700],
              search: true,
              filtering: true,
            }}
          />
        </Paper>
      );
    }
    return content;
  };

  return (
    <Container id="congressList">
      <Box my={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          {`Congress Member List `}
        </Typography>
        {configContent()}
      </Box>
    </Container>
  );
};

export default CongressMemberList;
