import React, { useState } from "react";
import AdminPetInformation from "../../components/AdminPetInformation";
import AdminUserInformation from "../../components/AdminUserInformation";
import AdminDirectory from "../../components/AdminDirectory";
import axios from "axios";
import chip from "../../images/chipper/chipperOne.png";
import "./style.css";

function AdminPage() {
  // set redirect for home route ****
  const [search, setSearch] = useState("");

  const [pet, setPet] = useState({
    petName: "",
    microNum: "",
    pupPicture: "",
    owner: {},
  });

  const onSubmit = (e) => {
    const searchTerm = search;
    axios
      .post("/api/search", {
        microNum: searchTerm,
      })
      .then((returnedSearch) => {
        // console.log(returnedSearch);
        if (returnedSearch.data) {
          setPet({
            petName: returnedSearch.data.pet.petName,
            microNum: returnedSearch.data.pet.microNum,
            pupPicture: returnedSearch.data.pet.petImageURL,
            owner: returnedSearch.data.user,
          });
        }
      })
      .catch((err) => {
        if (err) console.log(`petsearch server error ${err}`);
      });
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="justify-content-center">
      <div className="admin-container">
        <img src={chip} alt="logo" className="center"></img>
        <br />
        <AdminDirectory />
        <input
          name="search"
          className=""
          type="input"
          value={search}
          onChange={onChange}
        ></input>
        <br />
        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
        <br />
        <br />
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12 pet-info">
            <AdminPetInformation
              petName={pet.petName}
              microNum={pet.microNum}
              pupImage={pet.pupPicture}
            ></AdminPetInformation>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 user-info">
            <AdminUserInformation owner={pet.owner} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
