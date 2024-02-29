var { AuthApiService } = require("neurelo-sdk");
var { v4: uuid } = require("uuid");

async function loginRequest(data) {
  try {
    const res = await AuthApiService.findAuthByEmail(data.email, undefined);
    const userData = res.data?.data;

    if (res.status === 200 && userData) {
      if (String(userData?.deleted_at) !== "null") {
        return [undefined, { message: "Account has been deleted" }];
      }

      const usablePayload = {
        user_id: userData.user_id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      };

      return [usablePayload, undefined];
    }

    return [undefined, { message: "Error during user login" }];
  } catch (error) {
    const errorToReturn =
      error?.response?.data?.errors?.[0]?.error || error?.message;

    if (error?.response?.status === 404) {
      return [undefined, { message: "Invalid Credentials" }];
    }
    return [undefined, { message: errorToReturn }];
  }
}

async function registerRequest(data) {
  try {
    const res = await AuthApiService.createOneAuth(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: uuid(),
      },
      undefined
    );

    if (res.status === 201 || res.status === 200) {
      return [res.data?.data, undefined];
    }
    return [undefined, { message: "Error creating account" }];
  } catch (error) {
    const errorToReturn =
      error?.response?.data?.errors?.[0]?.error || error?.message;
    console.error("Error creating account : ", {
      error,
      errorMessage: errorToReturn,
    });
    return [undefined, { message: errorToReturn }];
  }
}

module.exports = {
  loginRequest,
  registerRequest,
};
