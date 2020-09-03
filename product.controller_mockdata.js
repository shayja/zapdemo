exports.create = (req, res) => {
    console.log('calling api method: create, params:', req.body);

    if (!req.body.name){
        res.status(404).json({message: 'חובה לשלוח את שם המוצר'});
    } else {
        res.status(200).json({ message: 'ok' });
    }
};

exports.findAll = (req, res) => {
    console.log('calling api method: findAll');
    const data =  [
        {'id': 'abc', 'name': 'Galaxy S20', 'price': 4000}, 
        {'id': 'def', 'name': 'Iphone X', 'price': 4500}
    ];
    res.status(200).json(data);
};

exports.findOne = (req, res) => {
    console.log(`calling api method: findOne, id: ${req.params.id}`);
    const data =  [
        {'id': 'abc', 'name': 'Galaxy S20', 'price': 4000}, 
        {'id': 'def', 'name': 'Iphone X', 'price': 4500}
    ];
    const p = data.find(x=>x.id === req.params.id);
    console.log(p);
    res.status(200).json(p);
};

exports.update = (req, res) => {
    console.log(`calling api method: update, id: ${req.params.id}`);

    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!'
        });
    } else {
        res.status(200).json({ message: 'ok' });
    }
};

exports.delete = (req, res) => {
    console.log(`calling api method: delete, id: ${req.params.id}`);
    res.status(200).json({ message: 'ok' });
};
