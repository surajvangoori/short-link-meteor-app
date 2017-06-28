import { Meteor } from 'meteor/meteor';
import '../imports/api/users' //No need the FROM keyword because it
// is going to get executed when the file runs
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';
import {WebApp} from 'meteor/webapp';

Meteor.startup(() => {

    WebApp.connectHandlers.use((req,res,next)=>{
        const _id=req.url.slice(1);//Slice function to remove the first / character
        const link = Links.findOne({_id:_id});

        if (link){
            console.log(_id);
            Meteor.call('links.trackVisit',_id);
            res.statusCode=302;
            res.setHeader('Location',link.url);
            res.end();
        }else{
            next();
        }

    });



    // WebApp.connectHandlers.use((req,res,next)=>{
    //    console.log('This is from custom middleware');
    //    console.log(req.url,req.method,req.headers,req.query);
    //    //Set HTTP status code
    //     //res.statusCode=404;
    //    //Set HTTP headers
    //     //res.setHeader('my-custom-header','This is a custom header');
    //    //Set HTTP body
    //     //res.write('<h1>This is middleware at work</h1>')
    //    //End HTTP request
    //     //res.end();
    //
    //    next();
    // });
});
