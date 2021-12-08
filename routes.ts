import { Context } from "https://deno.land/x/oak/mod.ts";
import users from "./users.ts";
import { create , getNumericDate, Payload } from "https://deno.land/x/djwt/mod.ts"
import key from './key.ts'

export const login = async (ctx: Context) => {
  const result= await ctx.request.body();
  for (const user of users) {
    if (result.type === "json") {
      const value = await result.value; // an object of parsed JSON
      if (value.username === user.username && value.password === user.password) {
        const payload: Payload = {
          iss: user.username,
          exp: getNumericDate(new Date().getTime() + 60000),
        }

        // Create JWT and send it to user
        const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, key);
        
        if (jwt) {
          ctx.response.status = 200;
          ctx.response.body = {
            id: user.id,
            username: user.username,
            jwt,
          }
        } else {
          ctx.response.status = 500;
          ctx.response.body = {
            message: 'Internal server error'
          }
        }
        return;
      }
    }
  }

  ctx.response.status = 422;
  ctx.response.body = {
    message: 'Invalid username or password'
  };
};

export const guest = (ctx: Context) => {
  ctx.response.body = 'Guest success';
};

export const auth = (ctx: Context) => {
  ctx.response.body = 'Auth success';
}