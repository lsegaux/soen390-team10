import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";

interface InputState {
  parts: any[];
}

export default class MaterialManager extends React.Component<
  RouteComponentProps,
  InputState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { parts: [] };
  }
  //TODO: Change the hostname to contact the back-end once endpoints are made to access actual database data.
  public componentDidMount(): void {
    axios.get(`http://localhost:3000/parts`).then((data) => {
      this.setState({ parts: data.data });
    });
  }
  //TODO: Change the hostname to contact the back-end once endpoints are made to access actual database data.
  public deletePart(id: number) {
    axios.delete(`http://localhost:3000/parts/${id}`).then((data) => {
      const index = this.state.parts.findIndex((part) => part.id === id);
      this.state.parts.splice(index, 1);
      this.props.history.push("/");
    });
  }

  public render() {
    const parts = this.state.parts;

    return (
      <>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {parts.length === 0 && (
            <div className="text-center">
              <h2>No part found at the moment</h2>
            </div>
          )}
          <Paper variant="outlined" elevation={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4" gutterBottom>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4" gutterBottom>
                        Types
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4" gutterBottom>
                        Materials
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parts &&
                    parts.map((part) => (
                      <TableRow key={part.id}>
                        <TableCell>
                          <Typography variant="h6" gutterBottom>
                            {part.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {part.types.map((type) => (
                            <Chip label={type} variant="outlined" />
                          ))}
                        </TableCell>
                        <TableCell>
                          {part.materials.map((material) => (
                            <Chip label={material} variant="outlined" />
                          ))}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup
                            size="large"
                            color="primary"
                            aria-label="large outlined primary button group"
                          >
                            <Button>
                              <Link to={`/materialmanager/edit/${part.id}`}>
                                Edit{" "}
                              </Link>
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => this.deletePart(part.id)}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            variant="outlined"
            component="a"
            href="/"
            style={{
              padding: "1%",
              margin: "1%",
            }}
          >
            Return to Dashboard
          </Button>
        </div>
      </>
    );
  }
}
