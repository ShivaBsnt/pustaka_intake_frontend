import { React, Component } from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
function Authentication({ isAuth: isAuth }) {
  const { access_token } = useParams();
  const [clientId, setClientId] = useState(
    "eb76221e-cff3-4682-9690-630f04645e5d"
  );
  const [clientSecret, setClientSecret] = useState(
    "7ccbefff-0011-4dbd-bb87-ec6854c50703"
  );
  const [accessToken, setAccessToken] = useState(access_token);

  useEffect(() => {
    // Update the document title using the browser API
    const access_token = accessToken;
    const data = {
      access_token,
    };

    console.log(data);
    axios.post("http://127.0.0.1:8001/oauth/login/", data).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      console.log(response.data.username);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.data.token);
        if (response.status == 200) {
          window.location.href = "http://localhost:3001/dashboard";
        }
    });
  });

  return (
    <div style={{
        width: 100,
	height: 100,
	// backgroundColor: "red",
	
	position: "absolute",
	top:0,
	bottom: 0,
	left: 0,
	right: 0,
  	
	margin: "auto",
    }}>
      <CircularProgress />
    </div>
  );
}
export default Authentication;
