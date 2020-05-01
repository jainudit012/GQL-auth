import React, { Component } from 'react';
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import LoginMutation from '../mutations/login'
import currentUserQuery from '../queries/currentUser'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: []
        }
    }

    componentWillUpdate(nextProps){
        if(!this.props.data.user && nextProps.data.user) this.props.history.push('/dashboard')
    }

    onFormSubmit({email, password}) {
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{ query: currentUserQuery}]
        })
        .then(()=> {
            this.setState({errors: []})
        })
        .catch(err => {
            if(err.graphQLErrors){
                const errors = err.graphQLErrors.map(err=>  err.message)
                this.setState({errors})
            }
        })
    }
    render() {
        return ( 
            <div className="container">
                <h3>Login Form</h3>
                <AuthForm 
                    onSubmit={({email, password}) => this.onFormSubmit({email, password})}
                    errors={this.state.errors}/>
            </div>
         );
    }
}
 
export default graphql(LoginMutation)(
    graphql(currentUserQuery)(LoginForm));