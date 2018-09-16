import User from '../entities/user';
const TOKEN_SECRET = 'myContactApp';
import {Strategy,ExtractJwt}  from 'passport-jwt';

module.exports=(passport)=>{
    var jwtOptions = {}
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = TOKEN_SECRET;
    
    let strategy = new Strategy(jwtOptions, function(payload, next) { 
      User.findOne({username:payload.username},function(err,user){
        if(err){
            return next(err,false);
        }
        if (user) {
            next(null, user);
          } else {
            next(null, false);
          }
      });
    });
    
    passport.use(strategy);
};
