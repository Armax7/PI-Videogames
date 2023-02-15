
exports.myIsObject = function (object) {
    return (!!object && 
        typeof object === 'object' &&
        !Array.isArray(object) &&
        object !== null);
}

exports.myReplaceWhiteSpace = function (str) {
    try {
        const trimmedString = str.trim();
        const splitString = trimmedString.split(' ');
        if (splitString.length <= 1) {
            return trimmedString;
        }
    
        const formattedString = splitString.join('_');
    
        return formattedString;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.mySortAscendingComparingFunc = function (a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    return 0;
}

exports.mySortDescendingComparingFunc = function (a, b) {
    if (a > b) {
        return -1;
    }
    else if (a < b) {
        return 1;
    }
    return 0;
}