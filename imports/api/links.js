/**
 * Created by surajvangoori1 on 6/24/17.
 */
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
export const Links = new Mongo.Collection('links');
import ShortId from 'shortid';

if(Meteor.isServer) {
    //Publishing Data to LinksList component
    Meteor.publish('linksPub', function(){
        //this.userId
        return Links.find({userId:this.userId});
    });
}

Meteor.methods({
    'links.insert'(url){
       if(!this.userId){
           throw new Meteor.Error('user-login-invalid');
       }

         new SimpleSchema({
            url:{
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url

            }
         }).validate({url});

       Links.insert({
          _id:ShortId.generate(),
          url,
          userId:this.userId,
          visible: true,
          visitedCount:0,
          lastVisitedAt:null
       });
    }
});

Meteor.methods({
    'links.setVisibility'(_id,visible){
        //Checking user is valid login
        if(!this.userId){
            throw new Meteor.Error('user-login-invalid');
        }

        new SimpleSchema({
            _id:{
                type:String,
                min:1
            },
            visible:{
                type:Boolean
            }
        }).validate({_id,visible})

        Links.update(
            {_id:_id,userId:this.userId},
            {$set:{visible:visible}}
        )
    }
});

Meteor.methods({
    'links.trackVisit'(_id)
    {
        //Checking user is valid login
        // if (!this.userId) {
        //     throw new Meteor.Error('user-login-invalid');
        // }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id})

        Links.update({ _id },
        {
            // $currentDate:{
            //     lastVisitedAt:true},
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        })
    }
});
