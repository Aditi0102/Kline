const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dotenv = require("dotenv");
dotenv.config();

const { CLIENT_ID, APP_SECRET } = process.env;
const base = process.env.PAYPAL_URI;
// const base = process.env.PRODUCTION_URI;
// console.log(base, "base");

exports.createPaypalOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await createOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

exports.capturePaypalOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderID } = req.body;
  console.log(req.body, "req.body");
  try {
    const captureData = await capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

async function createOrder(data) {
  const accessToken = await generateAccessToken();
  // console.log(accessToken, 'accessToken')
  const url = `${base}/v2/checkout/orders`;
  const item = data.product.cartItems;
  const val = data.product.cost;
  console.log(item, "val");
  // item[0].unit_amount.value = '99.00';
  const purchaseUnits = [
    {
      amount: {
        value: val,
        currency_code: "USD",
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: val,
          },
        },
      },
      items:item
    },
  ];
  // const purchaseUnits = [
  //   {
  //     amount: {
  //       value: "17.49",
  //       currency_code: "USD",
  //       breakdown: {
  //         item_total: {
  //           currency_code: "USD",
  //           value: "17.49",
  //         },
  //       },
  //     },

  //     items: [
  //       {
  //         unit_amount: {
  //           currency_code: "USD",
  //           value: "17.49",
  //         },
  //         quantity: "1",
  //         name: "item 1",
  //       },
  //     ],
  //   },
  // ];
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: purchaseUnits,
    }),
  });
  // console.log(response, "response");
  return handleResponse(response);
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  // console.log(auth, 'auth')
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

//  purchase_units: ,
