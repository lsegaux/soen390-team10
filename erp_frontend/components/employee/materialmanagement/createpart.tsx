import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export interface InputValues {
  part_name: string;
  part_types: [string];
  materials: [string];
}
export interface InputFormState {
  [key: string]: any;
  values: InputValues[];
}

class Create extends React.Component<RouteComponentProps, InputFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      name: "",
      types: [],
      materials: [],
      values: [],
    };
  }

  public onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }
  public onChangeTypes(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ types: e.target.value.split(",") });
  }
  public onChangeMaterials(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ materials: e.target.value.split(",") });
  }

  public onFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {
      name: this.state.part_name,
      types: this.state.part_types,
      materials: this.state.materials,
    };

    //TODO: Change the hostname to contact the back-end once endpoints are made to access actual database data.
    axios.post(`http://localhost:3000/parts`, formData).then((data) => {
      this.props.history.push("/");
    });
  }

  public render() {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h2">Create a new Part</Typography>
        <form onSubmit={this.onFormSubmission} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            name="name"
            placeholder="Enter the name of the part"
            value={this.state.name}
            onChange={this.onChangeName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="types"
            name="types"
            placeholder="Enter the subtypes of the part separated by commas"
            value={this.state.types}
            onChange={this.onChangeTypes}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="materials"
            name="materials"
            placeholder="Enter the materials of the part separated by commas"
            value={this.state.materials}
            onChange={this.onChangeMaterials}
          />
          <Button variant="contained" color="primary">
            Create Part
          </Button>
          <Button
            variant="outlined"
            component="a"
            href="/employee"
            style={{
              padding: "1%",
              margin: "1%",
            }}
          >
            Return to Dashboard
          </Button>
          <Button
            variant="outlined"
            component="a"
            href="/materialmanager"
            style={{
              padding: "1%",
              margin: "1%",
            }}
          >
            Return to Material Management
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Create);
