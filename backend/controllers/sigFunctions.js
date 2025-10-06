//imports
const FormTemplate = require('./../schemas/FormTemplate');
const ActForm = require('./../schemas/CurrentForm.js');
const Signature = require('./../schemas/Signature.js');
const User = require('./../schemas/User.js');
const InboxMessage = require('../schemas/InboxMessage.js');
const UserInboxes = require('./../schemas/UserInboxes.js');

exports.updateSig = async (req, res) => {
    try {
        // get the POST request
        const formID = req.body.formid;
        const sigID = req.body.sigid;
        const comm = req.body.comm;

        // check if there is a comment
        if (comm === undefined) {
            // if so then must be signing
            const uppers = {$set: {
                signatureDate: new Date(),
                isSigned: 'signed'
            }}

            // update signature in DB
            await Signature.updateOne({'id': sigID}, uppers);

            // check if all signatures are signed
            const allSigs = await Signature.find({'form': formID})

            // for future, when we need to remove forms from Tracker and DB
            let done = true;

            // go through each signature and check if all are signed
            allSigs.map(sig => {
                if (sig.isSigned !== "signed") {
                    done = false; 
                }
            })
            // do something if all are, do something else when not
            if (done) {
                res.status(201).json({msg: 'Signature was successfully updated'})
            } else {
                res.status(201).json({msg: 'Signature was successfully updated'})
            }
        } else {

            // if not, then we must be declining
            const uppers = {$set: {
                signatureDate: new Date(),
                isSigned: 'rejected'
            }}

            // update signature in DB 
            await Signature.updateOne({'id': sigID}, uppers);

            // add comment to form
            await ActForm.updateOne({'id': formID}, {$push: {comments: comm}})
            
            // change all signatures to N/A
            const allSigs = await Signature.find({'form': formID})

            // go through all sigs and update unsigned to na
            allSigs.map(async sig => {
                if(sig.isSigned === 'unsigned') {
                    await Signature.updateOne({'id': sig.id}, {$set: {isSigned: 'na'}})
                }
            });

            res.status(201).json({msg: "Signature was successfully updated"})
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: "There was an error in the backend, please try again", error: e.message})
    }
}
