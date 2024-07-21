// Servidor GraphQL usando Apollo Server y Express
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: Int
    email: String
    password: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(email: String!, password: String!): User
  }
`;

const saltRounds = 10;

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (parent, args) => {
        // Extrae email y password de args
        const { email, password } = args;

        if (!email || !password) {
        throw new Error("Email and password are required");
        }

        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return await prisma.user.create({
        data: { 
            email,
            password: hashedPassword
        },
      });
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);