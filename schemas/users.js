import { buildSchema } from 'graphql';
import { GraphQLUpload } from 'graphql-upload'


const usersSchema = buildSchema(`

    type Query {
      users: [User]
      user(_id: String!): User
    }

    type Mutation{
      createUser(email: String!, file: Upload): User!
      uploadFile(file: Upload): Confirmation!
    }

    type User {
      _id: String
      email: String
    }

    type Confirmation {
      success: Boolean
    }

    scalar Upload

`);

let users = [
  {
    _id: '1',
    email: 'test@test.com'
  },
  {
    _id: '2',
    email: 'test@gmail.com'
  },
  {
    _id: '3',
    email: 'test@contecht.eu'
  }
];

const getUsers = (args) => {

  return users;

}

const getUser = (args) => {

  let id = args._id;

  return users.filter( user => user._id === id)[0];

}

const createUser = (args) => {

  let newUser = {
    _id: (users.length + 1).toString(),
    email: args.email
  }

  users.push(newUser)

  return newUser;

}

const uploadFile = (args) => {

  console.log(args.file)

  return {
    success: true
  }

}

/******************** FILE UPLOAD REQUEST EXAMPLE ****************************
async sendFile(e) {

  let q = `
    mutation uploadFile($file: Upload){
      uploadFile(file: $file){
        success
      }
    }
  `
  let v = {
    file: null
  }

  let map = {
    '0': ['variables.file']
  }

  let o = {
    query: q,
    variables: v,
  }

  const formData  = new FormData();
  formData.append('operations', JSON.stringify(o));
  formData.append('map', JSON.stringify(map));
  formData.append(0, e.target.files[0]);

  const data = await fetch('http://localhost:3000/api/v2/graphql', {
              body: formData,
              method: 'POST',
  })
  .then(result => result.json());

  console.log(data)

}
*****************************************************************************/

const root = {

  Upload: GraphQLUpload,
  users: getUsers,
  user: getUser,
  createUser: createUser,
  uploadFile: uploadFile

}

export default {
  schema: usersSchema,
  resolver: root
}
