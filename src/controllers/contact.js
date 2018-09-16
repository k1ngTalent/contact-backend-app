import Contact from '../entities/contact';
/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods 
 */

 export const all = (req,res)=>{
   Contact.find({user:req.user._id}).exec((err,contact)=>{
       if(err){
         return res.status(401).json({
             status:"error",
             message:"User doesnt exist"
         })
       }
       return res.status(200).json({
        status:"success",
        data:contact
    })


   })
 }
 export const get = (req,res)=>{
     var id = req.params.contactId;
    Contact.find({_id:id,user:req.user._id},(err,contact)=>{
        if(err){
            return res.status(401).json({
                status:"error",
                message:"Contact doesnt exist"
            });
        }
        return res.status(200).json({
            status:"success",
            data:contact
        });
        
    })
  }

  export const create = (req,res)=>{
      let _Contact = new Contact(req.body);
      _Contact['user']=req.user._id;
      _Contact.save(_Contact,(err,contact)=>{
          if(err){
            return res.status(401).json({
                status:"error",
                message:"incorrect_entry/double"
            });
          }
          return res.status(200).json({
            status:"success",
            message:"contact_added",
            data:contact
        });
      })

   
  }
  export const update = (req,res)=>{
    let _contact = req.body;
    var id = req.param.contactId;
    var query = {id}
    Contact.findOneAndUpdate(query,{$set:_contact},{
        returnNewDocument: true
    },(err,contact)=>{
        if(err){
            return res.status(401).json({
                status:"error",
                message:"Failed"
            });
        }
        
              return res.status(200).json({
                status:"success",
                message:"contact_updated",
                data:contact
            });
        })
        
  }
  export const remove = (req,res)=>{
    var id = req.param.contactId;
    var query = {id}
    Contact.findOneAndRemove(query,(err,contact)=>{
        if(err){
            return res.status(401).json({
                status:"error",
                message:"Failed"
            });
        }
        return res.status(200).json({
            status:"success",
            message:"contact_deleted",
            data:contact
        });
        
    })
  }

export default {
    //get all contacts for a user
    all,
    // get a single contact
    get,
    // create a single contact
    create,
    // update a single contact
    update,
    // remove a single contact
    remove
}