import React from 'react';
import PCHeader from './pcHeader'
import PCFooter from './pcFooter'
import PCNewscontainer from './pcNewscontainer'

export default class PCIndex extends React.Component{
    render(){
      return (
        <div>
            <PCHeader/>
            <PCNewscontainer/>
            <PCFooter/>
        </div>
      );
    }
}