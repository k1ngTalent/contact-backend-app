import Contact from '../controllers/contact';
import express from 'express';
import passport from 'passport';
import  validate from 'express-validation';
import  validation from '../validation';
const router = express.Router();
router.get('/all', passport.authenticate('jwt', { session: false }),Contact.all);
router.get('/:contactId',passport.authenticate('jwt', { session: false }), Contact.get);
router.post('/create', passport.authenticate('jwt', { session: false }),validate(validation.addContact),Contact.create);
router.put('/update/:contactId',passport.authenticate('jwt', { session: false }),validate(validation.editContact), Contact.update);
router.delete('/:contactId',passport.authenticate('jwt', { session: false }),validate(validation.delContact), Contact.remove);
/**
 * 
 * 
 */
module.exports = app => {
    app.use('/contact', router)
    app.use(function(err, req, res, next){
        res.status(400).json(err);
      });
    /**
     * Create the remaining routes
     * get,
     * create,
     * delete,
     * update,
     * remove
     */
};
