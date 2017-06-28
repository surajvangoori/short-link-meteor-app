
import React from 'react';
import {Links} from '../api/links';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            links:[]
        };
    }
    componentDidMount() {
        console.log('componentDidMount LinksList');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('linksPub'); //Subscribing to data from api/links
            const links = Links.find(
                {visible:Session.get('showVisible')}
            ).fetch();
            this.setState({ links });
        });
    }

    componentWillUnmount(){
        console.log('componentWillUnmount LinksList');
        this.linksTracker.stop();
    }

    renderLinksListItems(){

        if (this.state.links.length === 0)
        {
            return(
               <div className="item">
                <p className="item__status-message">No links found! Add one</p>
               </div>
            )
        }else {
            return this.state.links.map((link) => {
                const shortUrl = Meteor.absoluteUrl(link._id);
                return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
                //return <p key={link._id}>{link.url}</p>
            });
        }
    }

    render(){
        return(
            <div>
              <FlipMove maintainContainerHeight={true}>
                  {this.renderLinksListItems()}
              </FlipMove>
            </div>
        );
    }


};


