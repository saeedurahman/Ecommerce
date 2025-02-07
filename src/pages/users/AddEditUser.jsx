import React, { useEffect, useState } from "react";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import { useNavigate, useParams } from "react-router";
import { validateSchema } from "../../lib/utils/helpers/validator";
import LoadingButton from "../../components/buttons/LoadingButton";
import UserSchema from "../../lib/utils/schemas/UserSchema";
import { USER_URL } from "../../lib/utils/constants/apiRoutes";
import { routes } from "../../lib/utils/constants";
import axios from "axios";
import { toast } from "sonner";
import LoadingOverlay from "../../components/loaders/LoadingOverlay";

const initialState = {
  name: "",
  email: "",
  gender: "",
  age: null,
  address: "",
  phoneNumber: "",
};

const AddEditUser = () => {
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = validateSchema(user, UserSchema);
    setErrors(newErrors);
    console.log("newErrors", newErrors);
    if (Object.keys(newErrors).length) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (id) {
        const response = await axios.put(`${USER_URL}/${id}`, {
          ...user,
          age: parseInt(user.age),
        });
        toast.success("User Updated Successfully");
        navigate(routes.USERS);
      } else {
        const response = await axios.post(USER_URL, {
          ...user,
          age: parseInt(user.age),
        });
        toast.success("User Added Successfully");
        navigate(routes.USERS);
      }
    } catch (error) {
      console.error("Error Occurred:", error);
      toast.error(error.response.data);
    }
    setIsLoading(false);
  };

  const fetchUser = async () => {
    setPageLoading(true);
    try {
      const response = await axios.get(`${USER_URL}/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error Occurred:", error);
      toast.error(error);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <>
      <LoadingOverlay isLoading={pageLoading} />
      <h1 className="mb-5 font-bold">{id ? "Edit User" : "Add User"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <FormInput
            label="Name"
            name="name"
            value={user.name}
            placeholder="Enter name"
            handleChange={handleChange}
            error={errors?.name}
          />
          <FormInput
            label="Email"
            name="email"
            value={user.email}
            placeholder="Enter email"
            handleChange={handleChange}
            error={errors?.email}
          />
          <FormInput
            label="Address"
            name="address"
            value={user.address}
            placeholder="Enter Address"
            handleChange={handleChange}
            error={errors?.address}
          />

          <FormInput
            label="Phone Number"
            name="phoneNumber"
            value={user.phoneNumber}
            placeholder="Enter Phone Number"
            handleChange={handleChange}
            error={errors?.phoneNumber}
          />
          <FormInput
            label="Age"
            name="age"
            value={user.age}
            placeholder="Enter Age"
            type="number"
            handleChange={handleChange}
            error={errors?.age}
          />
          <FormSelect
            label="Gender"
            name="gender"
            value={user.gender}
            handleChange={handleChange}
            error={errors?.gender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </FormSelect>
        </div>
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          className="w-full mt-5"
        >
          {id ? "Update" : "Add"}
        </LoadingButton>
      </form>
    </>
  );
};

export default AddEditUser;
