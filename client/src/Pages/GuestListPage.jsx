import React, { useState, useEffect } from "react";
import FetchUser from "../components/FetchUser";

const GuestListPage = () => {
  const [users, setUsers] = useState();
  const [role, setRole] = useState();

  const adminRoles = ["superadmin", "bridalCouple", "mum", "toastmaster"];
  const admin = adminRoles.includes(role);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      FetchUser.GetAllUsers().then((res) => setUsers(res.data));

      FetchUser.GetUser().then((res) => setRole(res.data.role));
    }
  }, [token]);

  return (
    <div>
      {admin === true ? (
        <>
          <h1 className="page-header">Gästlista</h1>
          {users ? (
            <div className="styled-div">
              

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

                  {(users.map((value, index) => {
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
