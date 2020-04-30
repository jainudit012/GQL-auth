const { GraphQLObjectType, GraphQLStringType } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        email: {
            type: GraphQLStringType
        }
    }
})

module.exports = UserType;