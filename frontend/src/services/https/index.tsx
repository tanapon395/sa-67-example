import { ProductInterface } from "../../interfaces/IProduct";

const apiUrl = "http://localhost:8000";
// const apiUrl = "http://localhost:5173";


// async function CreateProduct(data: ProductInterface) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/create_product`, requestOptions)
//     .then((res) => {
//       if (res.status == 201) {
//         return res.json();
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

async function CreateProduct(data: ProductInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/create_product`, requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


async function GetProduct() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/list_products`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

// async function GetProductById(id: Number | undefined) {
//   const requestOptions = {
//     method: "GET"
//   };

//   let res = await fetch(`${apiUrl}/product/${id}`, requestOptions)
//     .then((res) => {
//       if (res.status == 200) {
//         return res.json();
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

async function GetProductById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/product/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function UpdateProduct(data: ProductInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/update_product`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function DeleteProductByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/delete_product/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

async function GetConcert() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/list_concerts`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


export {
  GetProduct,
  GetProductById,
  DeleteProductByID,
  CreateProduct,
  UpdateProduct,
  GetConcert
};