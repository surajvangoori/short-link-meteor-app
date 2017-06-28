/**
 * Created by surajvangoori1 on 6/27/17.
 */
import React from 'react';
import {Session} from 'meteor/session';
import {Tracker} from 'meteor/tracker';

export default class LinksListFilter extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            showVisible: true
        };
    }

    componentDidMount(){
        this.linksTracker = Tracker.autorun(()=>{

            this.setState({
                showVisible: Session.get('showVisible')
            })
        });

    }

    componentWillUnmount(){
        this.linksTracker.stop();
    }

    render()
    {
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box" type="checkbox" checked = {!this.state.showVisible} id="showHidden" onChange={(e) => {
                        Session.set('showVisible', !e.target.checked)
                    }}/>
                    Show Hidden Links
                </label>
            </div>
        )
    }
}