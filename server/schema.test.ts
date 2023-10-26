// // integration.test.ts
// import {ApolloServer} from "@apollo/server";
// import schema from "./schema"; // Import your schema
// import {db} from "./db"; // Import your mock or test database
// import {beforeAll, describe, expect, it} from "vitest";

// describe("Counter GraphQL Operations", () => {
//   let server: ApolloServer;

//   beforeAll(() => {
//     // Initialize the ApolloServer with your schema
//     server = new ApolloServer({
//       schema,
//       context: () => ({db}), // Pass your mock or test database in context
//     });
//   });

//   it("fetches the initial counter value", async () => {
//     const res = await server.executeOperation({
//       query: `{
//         counter {
//           id
//           value
//         }
//       }`,
//     });

//     expect(res.errors).toBeUndefined();
//     expect(res.data?.counter.id).toBe("1");
//     expect(res.data?.counter.value).toBe(0);
//   });

//   it("increments the counter value", async () => {
//     const incrementRes = await server.executeOperation({
//       mutation: `
//       mutation {
//         incrementCounter {
//           id
//           value
//         }
//       }
//     `,
//     });

//     expect(incrementRes.errors).toBeUndefined();
//     expect(incrementRes.data?.incrementCounter.id).toBe("1");
//     expect(incrementRes.data?.incrementCounter.value).toBe(1); // Assert that it has incremented from the initial value

//     // Optionally, fetch the counter again to ensure consistency
//     const counterRes = await server.executeOperation({
//       query: `{
//       counter {
//         id
//         value
//       }
//     }`,
//     });

//     expect(counterRes.errors).toBeUndefined();
//     expect(counterRes.data?.counter.id).toBe("1");
//     expect(counterRes.data?.counter.value).toBe(1);
//   });
// });
