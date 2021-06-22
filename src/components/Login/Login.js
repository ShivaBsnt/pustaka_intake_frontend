import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginTab() {
  const classes = useStyles();
  function handleUser() {
    console.log("handle user");
  }
  function handleLoginWithPustakaSubmit(e) {
    e.preventDefault();
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      axios
        .get("http://127.0.0.1:8001/user/", {
          headers: { authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          if (response.status == 200) {
            window.location.href = "http://localhost:3001/dashboard";
          }
        });
    } else {
      const client_id = "eb76221e-cff3-4682-9690-630f04645e5d";
      const url = `http://localhost:3000/login?client_id=${client_id}`;
      window.location.href = url;
    }
  }
  const Login = (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
      toast.info("username or password cannot be empty!", {
        position: "bottom-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const credential = {
        username: username,
        password: password,
      };
      axios
        .post("http://127.0.0.1:8001/user/login/", credential)
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data.token);
            localStorage.setItem("username", username);
            localStorage.setItem("token", response.data.token);
            window.location.href = "/dashboard";
          }
        })
        .catch((error) => {
          console.log("error");
          toast.error("⚠️ Invalid username or password!", {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[show, setShow]=useState(false)
  useEffect(() => {
    console.log(
      "user might have token check it",
      localStorage.getItem("token"),
      localStorage.getItem("username")
    );
    if (localStorage.getItem("token")) {
      axios
        .get("http://127.0.0.1:8001/user/", {
          headers: { authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("component did mount")
            setShow(false)
            window.location.href="http://localhost:3001/dashboard"
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    } 
    else{
      setShow(true)
    }
  });
  if (show){
    console.log("inside render")
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={Login}
            >
              Log In
            </Button>
            <div>OR</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ background: "#ed9d2b" }}
              className={classes.submit}
              onClick={handleLoginWithPustakaSubmit}
            >
              LogIn With Pustaka
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <ToastContainer />
      </Container>
    );
  }
 return null
}
