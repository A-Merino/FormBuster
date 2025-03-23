exports.saveForm = (req, res) => {
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


exports.getForms = (req, res) => {
    try {
        const forms = await FormTemplate.find();
        res.status(200).json({ forms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred", error: error.message });
    }
};