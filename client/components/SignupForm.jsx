import React, { Component } from 'react';
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import SignupMutation from '../mutations/signup'
import currentUserQuery from '../queries/currentUser'

class SignupForm extends Component {
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
                <h3>Signup Form</h3>
                <AuthForm 
                    onSubmit={({email, password}) => this.onFormSubmit({email, password})}
                    errors={this.state.errors}/>
            </div>
         );
    }
}
 
export default graphql(SignupMutation)(
    graphql(currentUserQuery)(SignupForm));