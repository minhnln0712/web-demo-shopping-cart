import ProductCard from "../../components/ProductCard/ProductCard";
import Grid from "@mui/material/Grid";

export default function Home(params: any) {
  const aList = [
    {
      productId: "111",
      productName: "Áo 1",
      price: 10,
      img: "https://product.hstatic.net/1000357687/product/chaoartboard-5_2cd7a3c50f7645c9990dcee339b3db86_1024x1024.png",
    },
    {
      productId: "222",
      productName: "Áo 2",
      price: 100,
      img: "https://product.hstatic.net/1000357687/product/lust-poison--recoveredartboard-1_5f22e87699d54fb882b4ae8bb7badc4c_1024x1024.png",
    },
    {
      productId: "333",
      productName: "Áo 3",
      price: 20,
      img: "https://product.hstatic.net/1000357687/product/ao-trangartboard-5_b92f952f8cff490680521d353d8323b6_1024x1024.png",
    },
    {
      productId: "444",
      productName: "Áo 4",
      price: 102,
      img: "https://product.hstatic.net/1000357687/product/ao-dap-noi---denartboard-2_9184458dc8eb4bb9a0469cdaf9909cba_1024x1024.png",
    },
    {
      productId: "555",
      productName: "Áo 5",
      price: 104,
      img: "https://product.hstatic.net/1000357687/product/memphis_trangartboard_5_3f53ebbe7fa34cc49707776bba940696_1024x1024.jpg",
    },
    {
      productId: "666",
      productName: "Áo 6",
      price: 102,
      img: "https://product.hstatic.net/1000357687/product/memphis_denartboard_2_1762b9848c4d4ec599966795a1104734_1024x1024.jpg",
    },
    {
      productId: "777",
      productName: "Áo 7",
      price: 1032,
      img: "https://product.hstatic.net/1000357687/product/vskh_2_-_den_artboard_2_5dba29cc5ae5481b82eeb896d3e25a24_1024x1024.jpg",
    },
  ];

  return (
    <div className="product-list">
      <Grid container spacing={1} sx={{ m: "auto", width: "70%", mt: 3 }}>
        {aList.map((value, key) => {
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
    </div>
  );
}
