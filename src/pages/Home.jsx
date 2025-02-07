import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { routes } from "../lib/utils/constants";
import { PRODUCTS_URL } from "../lib/utils/constants/apiRoutes";
import axios from "axios";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import FormInput from "../components/forms/FormInput";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    let newUrl = PRODUCTS_URL;
    if (search) {
      newUrl = `${PRODUCTS_URL}/search?q=${search}`;
    }

    const response = await axios.get(newUrl);
    setProducts(response.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row?.title,
    },
    {
      name: "Price",
      selector: (row) => row?.price,
    },
    {
      name: "Category",
      selector: (row) => row?.category,
    },
    {
      name: "Creted At",
      selector: (row) => row?.meta?.createdAt,
      format: (row) =>
        dayjs(row?.meta?.createdAt).format("MMMM D, YYYY h:mm A"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link to={`${routes.USERS}/${row?.id}`}>View Details</Link>
      ),
      sortable: false,
      width: "100px",
      headerStyle: {
        backgroundColor: "#f7f7f7",
      },
      cellStyle: {
        color: "#444",
      },
    },
  ];

  console.log("hi here", search);

  return (
    <>
      <h1>Products</h1>

      <div className="max-w-60">
        <FormInput
          placeholder="Search"
          value={search}
          handleChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <DataTable columns={columns} data={products} />
      </div>
    </>
  );
};

export default Home;
