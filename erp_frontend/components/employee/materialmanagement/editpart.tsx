import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

export interface InputFormState {
  id: number;
  name: string;
  types: string[];
  materials: string[];
}

class Edit extends React.Component<RouteComponentProps<any>, InputFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      types: [],
      materials: [],
    };
  }
  public onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }
  public onChangeTypes(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ types: e.target.value.split(",") });
  }
  public onChangeMaterials(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ materials: e.target.value.split(",") });
  }

  public onFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      types: this.state.types,
      materials: this.state.materials,
    };
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
        <Box
          component="span"
          m={1}
          padding={40}
          width={400}
          height={300}
          alignItems="center"
        >
          <CssBaseline />
          <Paper elevation={4}>
            <Typography variant="h2">Edit a Part</Typography>
            <form
              onSubmit={this.onFormSubmission}
              noValidate
              autoComplete="off"
            >
              <div style={{ padding: "20px", paddingBottom: "40px" }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  name="name"
                  onChange={this.onChangeName}
                  value={this.state.name}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="types"
                  name="types"
                  onChange={this.onChangeTypes}
                  value={this.state.types}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="materials"
                  name="materials"
                  onChange={this.onChangeMaterials}
                  value={this.state.materials}
                />
                <Button variant="contained" color="primary">
                  Edit part
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
              </div>
            </form>
          </Paper>
        </Box>
      </div>
    );
  }
}
export default withRouter(Edit);
