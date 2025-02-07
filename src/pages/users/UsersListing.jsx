import React, { useEffect, useState } from "react";
import { USER_URL } from "../../lib/utils/constants/apiRoutes";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router";
import { routes } from "../../lib/utils/constants";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import LoadingOverlay from "../../components/loaders/LoadingOverlay";

const UsersListing = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(USER_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error Occurred:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log("users", users);

  const handeleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`${USER_URL}/${id}`);
      console.log("response", response);
      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);

        toast.success("User Deleted Successfully");
      }
    } catch (error) {
      console.error("Error Occurred:", error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
    },
    {
      name: "age",
      selector: (row) => row?.age,
    },
    {
      name: "Phone Number",
      selector: (row) => row?.phoneNumber,
    },

    {
      name: "Gender",
      selector: (row) => row?.gender,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`${routes.USERS_EDIT}/${row?.id}`}>
            <Eye />
          </Link>
          <button
            className="bg-red-500 text-white p-1 rounded-full"
            onClick={() => handeleDeleteUser(row?.id)}
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingOverlay isLoading={isLoading} />;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h1>Users</h1>
        <Link
          to={routes.USERS_ADD}
          className="customGreenGradient customGreenGradientShadow py-[15px] rounded-full px-5 text-sm font-semibold"
        >
          Add User
        </Link>
      </div>
      <div className="mt-5 bg-customDarkBlue rounded p-2">
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
};

export default UsersListing;
