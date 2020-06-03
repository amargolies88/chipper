import React, { useEffect } from "react";

import NavBar from "../../components/NavBar";
import PetInformation from "../../components/PetInformation";
import AddPet from "../../components/AddPet";

const UserPetsProfile = props => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [])
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row pup-row">
          <div className="col-12 userInformation">
            <PetInformation />
            <AddPet></AddPet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPetsProfile;
