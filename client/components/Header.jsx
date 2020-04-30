import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import currentUserQuery from '../queries/currentUser'
import logout from '../mutations/logout'
import { Link } from 'react-router-dom'

class Header extends Component {

    onLogout(){
        this.props.mutate({
            refetchQueries: [{query: currentUserQuery}]
        })
    }

    renderButtons(){
        const {loading, user} = this.props.data
        
        if(loading) return <div />
        if(user){
            return (
                <li>
                    <a onClick={() => this.onLogout()}>Log Out</a>
                </li>
            )
        }else {
            return (
                <div>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">Log In</Link>
                    </li>
                </div>
            )
        }
    }
    
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-container container">
                        <Link to="/" className="brand-logo left">Home</Link>
                        <ul className="right">
                            {this.renderButtons()}
                        </ul>
                    </div>
                </nav>
                {this.props.children}
            </div> 
         );
    }
}
 
export default graphql(logout)(
    graphql(currentUserQuery)(Header));