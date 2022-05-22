import React, { useState, useEffect } from "react";
import FetchUser from "../components/FetchUser";

const GuestListPage = () => {
  const [users, setUsers] = useState();
  const [role, setRole] = useState();
  const [filter, setFilter] = useState();
  const [filteredUsers, setFilteredUsers] = useState();

  const adminRoles = ["superadmin", "bridalCouple", "mum", "toastmaster"];
  const admin = adminRoles.includes(role);

  const token = localStorage.getItem("token");
  

  useEffect(() => {
    if (token) {
      FetchUser.GetAllUsers().then((res) => {setUsers(res.data); setFilteredUsers(res.data)});

      FetchUser.GetUser().then((res) => setRole(res.data.role));
      setFilteredUsers(users);
    }
  }, [token]);

  const handleFilter = (e) => {
    if(e.target.value==="attending"){
      setFilteredUsers(users.filter((value, index) => value.attending === true));
    }
    else if(e.target.value==="diet"){
      setFilteredUsers(users.filter((value, index) => value.diet !== undefined));
    }
    else if(e.target.value==="performing"){
      setFilteredUsers(users.filter((value, index) => value.performing === true));
    }
    else if(e.target.value==="alcohol"){
      setFilteredUsers(users.filter((value, index) => value.alcohol === true));
    }
    else if(e.target.value==="noalcohol"){
      setFilteredUsers(users.filter((value, index) => value.alcohol === false));
    }
    else if(e.target.value==="showAll"){
      setFilteredUsers(users);
    }
  };
  

  return (
    <div>
      {admin === true ? (
        <>
          <h1 className="page-header m-2 center">Gästlista</h1>
          {users ? (
            <div className="styled-div">
              <select onChange={handleFilter}>
                <option value="showAll">Visa alla</option>
                <option value="attending">Kommer</option>
                <option value="alcohol">Alkoholhaltigt</option>
                <option value="noalcohol">Alkoholfritt</option>
                <option value="diet">Specialkost</option>
                <option value="performing">Uppträder</option>
              </select>
              <p>{filter}</p>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Namn</th>
                    <th scope="col">Kommer</th>
                    {role !== "bridalCouple" && 
                      <>
                      {role !== "toastmaster" &&
                        <>
                          <th scope="col">Alkoholpreferens</th>
                          <th scope="col">Specialkost/Allergi</th>
                        </>
                      }
                      {role !== "mum" &&
                        <>
                          <th scope="col">Uppträder/Håller tal</th>
                          <th scope="col">Email</th>
                        </>
                      }
                      </>
                    }
                  </tr>
                </thead>
                <tbody>

                  {(filteredUsers.map((value, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{value.fullName}</td>

                        <td>
                          {value.attending === true && <span>Ja</span>}
                          {value.attending === false && <span>Nej</span>}
                          {value.attending === undefined && <span>Inte svarat</span>}
                        </td>

                        {role !== "bridalCouple" &&
                          <>
                            {role !== "toastmaster" &&
                              <>
                                <td>
                                  {value.alcohol === true && <span>Alkoholhaltig dryck</span>}
                                  {value.alcohol === false && <span>Alkhoholfri dryck</span>}
                                </td>
                      
                                <td>
                                  {value.diet && <span>{value.diet}</span>}
                                </td>
                                </>
                            }

                            {role !== "mum" &&
                              <>
                                <td>
                                  {value.performing === true && <span> Ja</span>}
                                  {value.performing === false && <span> Nej</span>}
                                </td>

                                <td>
                                  {value.email && <span>{value.email}</span>}
                                </td>
                              </>
                            }
                          </>
                        }
                      </tr>
                    )
                  }))}
                  
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </>
      ) : (
        <p>Not admin</p>
      )}
    </div>
  );
};

export default GuestListPage;
