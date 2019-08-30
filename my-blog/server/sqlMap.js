/**
 * Created by admin on 2018/8/27.
 */
var sqlMap = {
  getValue: 'SELECT * FROM test WHERE id = ?',
  setValue: 'UPDATE test SET name = ? WHERE id = ?'
}

module.exports = sqlMap;