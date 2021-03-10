const mongoose = require('mongoose');
const Month = mongoose.model('months');

module.exports = (app) => {

  app.get(`/api/months`, async (req, res) => {
    let months = await Month.find();
    return res.status(200).send(months);
  });

  app.post(`/api/months`, async (req, res) => {
    let month = await Month.create(req.body);
    return res.status(201).send({
      error: false,
      month
    })
  })

  app.put(`/api/months/:id`, async (req, res) => {
    const {id} = req.params;

    let month = await Product.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      month
    })

  });

  app.delete(`/api/months/:id`, async (req, res) => {
    const {id} = req.params;

    let month = await Month.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      month
    })

  })

}