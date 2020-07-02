let dbu = "admin"
let dbp = "47DRiNpn29pB2KAubTT7jyzuNa56Zz"
let dbn = "ds161446.mlab.com:61446/heroku_bhvqmxbs"

module.exports = {
  'dbu':dbu,
  'dbp':dbp,
  'dbn':dbn,
  'dba':'mongodb://'+dbu+':'+dbp+'@'+dbn
}
