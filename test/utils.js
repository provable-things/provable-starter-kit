module.exports.waitForEvent = (_event, _from = 0, _to = 'latest') =>
  new Promise((resolve, reject) =>
    _event({ fromBlock: _from, toBlock: _to }, (_err, _ev) =>
      _err ? reject(_err) : resolve(_ev)))
