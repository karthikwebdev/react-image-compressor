import React, { Component } from 'react'
import { UserConsumer } from './context'

class C extends Component {
    render() {
        return (
           <UserConsumer>
               {
                   value => <h1> {value} </h1>
               }
           </UserConsumer>
        )
    }
}

export default C
