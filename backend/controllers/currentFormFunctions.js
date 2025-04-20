const FormTemplate = require('./../schemas/FormTemplate');
const ActForm = require('./../schemas/CurrentForm.js');
const Signature = require('./../schemas/Signature.js');
const User = require('./../schemas/User.js');


async function getHash(size) {
    // get our characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    let result = '';
    // goes through and adds a random character to the list
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    // checks if the string already exsists
    // 12 ^ 37 is like 10^39 zeroes so its highly unprobable to get a copy anyway 
    const allForms = await ActForm.findOne({'id': result});
    if (allForms === null) {
        // return if unique
        return result;

    } else {
        // go again if not
        return getHash(size);
    }


}

async function defaultSignature(user, formID, formName) {
    const pends = [];
    // some sort of logic to determine the form goes to the correct people
    /*
        Logic Here

    */

    // signature for creator of form
    const newSig = new Signature({
        form: formID,
        user: user,
        signatureDate: new Date(),
        isSigned: 'signed'
    });
    await newSig.save();
    // add to signature list
    await User.updateOne({'email': user.email}, {$push: {forms: formID}})
    pends.push(newSig);


    // just calls all faculty users atm
    const facs = await User.find({'role':'staff'})

    await Promise.all(
    facs.map(async account => { 
        const newSig = new Signature({
            form: formID,
            user: account
        });
        await newSig.save();
        // add to signature list
        pends.push(newSig);

        // update the user account
        await User.updateOne({'email': account.email}, {$push: {forms: formID}})

    })
        );

    return pends

}



exports.submitForm = async (req, res) => {
    try {

        // get information
        const { formData, formType, origin } = req.body;
        
        // find the form type this is
        const form = await FormTemplate.findOne({'name':formType});
        // get a unique 12 digit hash
        const uid = await getHash(12);

        // create the current form object; don't mind it being cald actForm lol
        const newForm = new ActForm({
            id: uid,
            formType: form,
            formData: formData,
            status: "Pending",
            comments: [],
            creationDate: new Date(),
            signatures: await defaultSignature(origin, uid, formType)

        });
        // save form and let the people know
        await newForm.save();
        res.status(201).json({ msg: "Form Submitted" });


    } catch (error) {
        // error stuff
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });

    }
};



/*
    Function that returns the data for an active form 

    req is in the form of 
        method: "POST"
        headers: 
        body: {
            id: <FORM_ID>
        }
*/
exports.getActive = async (req, res) => {
    try {
        // get the active form from the database 
        const form = await ActForm.findOne({'id': req.body.id});

        // return it
        res.status(201).json({form});
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
}