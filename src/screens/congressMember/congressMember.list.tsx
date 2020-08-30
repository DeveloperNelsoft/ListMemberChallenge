import React, { useEffect, useState } from "react";
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
import productReducer from "../../state/CongressMemberReducer";
import * as types from "../../state/types";
import getAxios from "../../apiConnector/apiConnector";

interface CongressMemberTableState {
  CongressMemberList: CongressMember[];
  loading: Boolean;
}

interface CongressMemberTableProps {}

const CongressMemberTable: React.SFC<CongressMemberTableState> = (props) => {
  const [state, dispatch] = productReducer();

  const [currentCongressMemberId, setCurrentCongressMemberId] = useState("");

  useEffect(() => {
    dispatch({ type: types.LOADING });

    const urlBackend = `https://api.propublica.org/congress/v1/116/senate/members.json`;
    getAxios
      .instance("")
      .get(urlBackend)
      .then((result: any) => result.data)
      .then((responseData: any) => {
        dispatch({
          type: types.GET_CONGRESS_MEMBER,
          data: responseData.results[0].members as CongressMember[],
        });
      });
  }, []);

  const configContent = () => {
    let content = <ReactLoading type="bubbles" color="#DDD" />;

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

    if (!state.isLoading) {
      content = (
        <Paper>
          <MaterialTable
            columns={[
              { title: "Id", field: "id" },
              { title: "First name", field: "first_name" },
              { title: "Last name", field: "last_name" },
              { title: "Gender", field: "gender" },
              { title: "Date of birth", field: "date_of_birth" },
              { title: "state", field: "state" },
              { title: "Leadership role", field: "leadership_role" },
            ]}
            icons={tableIcons}
            data={state.congressMember}
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
              search: false,
            }}
          />
        </Paper>
      );
    }
    return content;
  };

  const addProduct = (event: any) => {
    const textNewProduct = `newProduct ${state.congressMember.length + 1} `;

    const newProduct = {
      id: state.product.length + 1,
      brand: textNewProduct,
      description: textNewProduct,
      image: "none",
      price: `${state.congressMember.length + 1} `,
    };

    dispatch({ type: types.ADD_CONGRESS_MEMBER, data: newProduct });
  };

  const udateProduct = (event: any) => {
    const updatedProduct = `product updated ${currentCongressMemberId} `;

    const updProduct = [
      ...state.product.map((z: any, i: number) =>
        i === parseInt(currentCongressMemberId, 10) - 1
          ? (z = {
              id: z.id,
              brand: updatedProduct,
              description: updatedProduct,
              image: z.image,
              price: z.price,
            })
          : z
      ),
    ];

    dispatch({ type: types.UPDATE_CONGRESS_MEMBER, data: updProduct });
  };

  const deleteProduct = (event: any) => {
    const deletProduct = [
      ...state.product.filter(
        (x: any, i: number) =>
          parseInt(x.id, 10) !== parseInt(currentCongressMemberId, 10)
      ),
    ];

    dispatch({ type: types.DELETE_CONGRESS_MEMBER, data: deletProduct });
  };

  const takeProductId = (event: any) => {
    setCurrentCongressMemberId(event.target.value);
  };

  return (
    <Container>
      <Box my={2}>
        <Link to="/congressMemberGrid">Ver congressMemberGrid</Link>
      </Box>
      <Box my={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          {`Congress Member List `}
        </Typography>
        {/* <div>
          <span>
            (mini local CRUD over global state using useReducer hooks example )
            id to edit or delete:{" "}
          </span>
          <input value={currentCongressMemberId} onChange={takeProductId} />
          <span> - </span>
          <button onClick={(event: any) => addProduct(event)}> ADD </button>
          <span> - </span>
          <button onClick={(event: any) => udateProduct(event)}>
            {" "}
            UPDATE{" "}
          </button>
          <span> - </span>
          <button onClick={(event: any) => deleteProduct(event)}>
            {" "}
            DELETE{" "}
          </button>
          <br></br>
          <br></br>
        </div> */}

        {configContent()}
      </Box>
    </Container>
  );
};

export default CongressMemberTable;
