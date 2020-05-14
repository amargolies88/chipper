import React, { useContext } from "react";
import "./style.css";
import { Redirect, Link } from "react-router-dom";
import UserContext from "../components/CurrentUserContext"
// import img from "../images/chipper/pets.png"

function UserInformation() {
    const User = useContext(UserContext)
    return (
        <div className="userInformation">
            {/* <img src={img} alt="line-of-pets"/> */}
            <h2 id="center-h1">Owner Information:</h2>
            <hr className="hr-row"/>
            <br />
            <div class="card card-background">
                <div class="card-body">
                    <br/>
                    <h3 class="card-text">Full Name:</h3>
                    <p>{User.username}</p>
                    <h3 class="card-text"></h3>
                    <p></p>
                    <h3 class="card-text">Email Address:</h3>
                    <p>{User.email}</p>
                    <h3 class="card-text">Phone Number:</h3>
                    <p>{User.phone}</p>
                    <a href="#" class="btn btn-warning"><Link className="navlink"  to="/userUpdate">Update Information</Link></a>
                </div>
            </div>
        </div>

    )
}

export default UserInformation