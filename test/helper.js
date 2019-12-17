//Converts mm-dd-yyyy format into ticks

var getDate = function (dateFormat) {
    return (new Date(dateFormat).getTime() / 1000)
}

module.exports = getDate;
