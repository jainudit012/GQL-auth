import gql from 'graphql-tag'

export default gql`
    mutation CreateUser($email: String, $password: String){
        signup(email: $email, password: $password){
            id
            email
        }
    }
`