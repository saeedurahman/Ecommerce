import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { routes } from "../../lib/utils/constants";
import { PRODUCTS_URL } from "../../lib/utils/constants/apiRoutes";
import axios from "axios";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import LoadingButton from "../../components/buttons/LoadingButton";
import { Eye } from "lucide-react";

const initialFilters = {
  query: "",
  category: "",
};

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [productCategories, setProductCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFilters({ ...filters, [name]: value, query: "" });
    } else {
      setFilters({ ...filters, [name]: value, category: "" });
    }
  };

  const fetchProducts = async (pageNumber = 1, limit = 10) => {
    setIsLoading(true);
    let url = "";

    if (filters.category) {
      url = `${PRODUCTS_URL}/category/${filters.category}`;
    } else if (filters.query) {
      url = `${PRODUCTS_URL}/search?q=${filters.query}`;
    } else {
      url = `${PRODUCTS_URL}?limit=${limit}&skip=${
        (Number(pageNumber) - 1) * limit
      }`;
    }

    const response = await axios.get(url);
    setTotalRows(response.data.total);
    setProducts(response.data.products);
    setIsLoading(false);
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setProductCategories(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, [filters]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row?.id,
    },
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
      name: "Stock",
      selector: (row) => row?.stock,
    },
    {
      name: "Created At",
      selector: (row) => row?.meta?.createdAt,
      format: (row) =>
        dayjs(row?.meta?.createdAt).format("MMMM D, YYYY h:mm A"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link to={`${routes.PRODUCTS}/${row?.id}`}>
          <Eye />
        </Link>
      ),
      sortable: false,
      width: "100px",
    },
  ];
  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    fetchProducts(page, newPerPage);
  };

  return (
    <>
      <h1>Products</h1>

      <div className="flex items-center gap-5 mt-5 w-full">
        <FormInput
          placeholder="Search"
          value={filters.query}
          name="query"
          handleChange={handleChange}
        />

        <FormSelect
          value={filters.category}
          name="category"
          handleChange={handleChange}
        >
          <option value="">Select</option>
          {productCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </FormSelect>
        <LoadingButton
          className="py-3"
          handleClick={() => setFilters(initialFilters)}
        >
          Clear Filters
        </LoadingButton>
      </div>

      <div className="mt-5">
        <DataTable
          columns={columns}
          data={products}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </div>
    </>
  );
};

export default ProductsListing;
