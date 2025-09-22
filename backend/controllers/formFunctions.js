const FormTemplate = require('../schemas/FormTemplate');

// saves req form to the database
exports.saveForm = async (req, res) => {
    try {
        const { name, data } = req.body;
        const newForm = new FormTemplate({ name, data });
        await newForm.save();

        res.status(201).json({ msg: "Save successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
};

// Gets all Form Templates from the database
// Mainly used for /form-list
exports.getForms = async (req, res) => {
    try {
        const forms = await FormTemplate.find();
        res.status(200).json({ forms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
};

// gets a form from the database by the name
exports.getFormByName = async (req, res) => {
    try {
        const { name } = req.params;
        const form = await FormTemplate.findOne(
            {name: new RegExp("^" + name.replaceAll("-", " ") + "$", "i")});
        res.status(200).json({ form });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
}


exports.getFormName = async (req, res) => {
    try {
        const form = await FormTemplate.findOne({id: req.body.formid});
        const name = form.name
        res.status(200).json({name})
    } catch (e) {
        console.error(e);
    }
}