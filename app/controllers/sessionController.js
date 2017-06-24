
var sessionController = {
  addItem: function(req, res){
    var id = req.params.id;
    session = req.session;
    item = {};
    item.id = id;
    item.quantity = 1;
    if(session.item){
      var length = session.item.length;
      session.item[length] = item;
    }
    else{
      session.item = [];
      session.item[0] = item;
    }
    res.status(200).send('Success');
  }
}

module.exports = sessionController;
