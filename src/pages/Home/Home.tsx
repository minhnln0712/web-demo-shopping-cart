import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Grid from "@mui/material/Grid";
import Axios from "axios";
import { Box, TextField } from "@mui/material";

export default function Home(params: any) {
  const [listProduct, setListProduct] = useState<any[]>([
    {
      productId: "",
      productName: "",
      productDetail: "",
      price: 0,
      productTypeName: "",
      img: "",
    },
  ]);
  useEffect(() => {
    Axios.get(`https://localhost:7040/api/Products?pageIndex=1&pageItems=10`)
      .then((response) => {
        setListProduct(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchProduct = (keyword: string) => {
    Axios.get(
      `https://localhost:7040/api/Products?ProductName=${keyword}&pageIndex=1&pageItems=10`
    )
      .then((response) => {
        setListProduct(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="product-list">
      <Box sx={{ m: "auto", width: "70%", mt: 3 }}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Search product"
          variant="standard"
          onChange={(event) => searchProduct(event.target.value)}
        />

        <Grid container spacing={1} sx={{ mt: 3 }}>
          {listProduct.map((value, key) => {
            return (
              <Grid item xs={3} key={key}>
                <ProductCard
                  productId={value.productId}
                  productName={value.productName}
                  price={value.price}
                  img={value.img}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}
