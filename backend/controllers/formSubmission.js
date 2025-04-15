const FormTemplate = require('./../schemas/FormTemplate');
const ActForm = require('./../schemas/CurrentForm.js');
const Signature = require('./../schemas/Signature.js');


function getHash(size) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    let result = '';
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    const allForms = ActForm.findOne({'id': result});
    if (allForms === null) {
        return result;

    } else {
        return getHash(size);
    }


}

function defaultSignature(user) {

    

}



exports.submitForm = async (req, res) => {
    try {



        const { data, formType, account } = req.body;

        const form = await FormTemplate.findOne({formType});


        const newForm = new ActForm({
            id: getHash(12),
            formType: form,
            formData: data,
            status: "Pending",
            comments: [],
            creationDate: new Date(),
            signatures: defaultSignature(account)

        });  
        await newForm.save();
        


    } catch (error) {

    }
};