const router = require('express').Router();
let Help = require('../models/help.model');

router.route('/').get((req, res) => {
  Help.find()
    .then(helps => res.json(helps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const subject = req.body.subject;

  const newHelp = new Help({
    username,
    description,
    subject
  });

  newHelp.save()
  .then(() => res.json('Help added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Help.findById(req.params.id)
    .then(help => res.json(help))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Help.findByIdAndDelete(req.params.id)
    .then(() => res.json('Help deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Help.findById(req.params.id)
    .then(help => {
      help.username = req.body.username;
      help.description = req.body.description;
      help.subject = req.body.subject;

      help.save()
        .then(() => res.json('Help updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;