
export function myIsObject(object) {
    return (!!object && 
        typeof object === 'object' &&
        !Array.isArray(object) &&
        object !== null);
}

export function myReplaceWhiteSpace (str) {
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

export function mySortAscendingComparingFunc (a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    return 0;
}

export function mySortDescendingComparingFunc(a, b) {
    if (a > b) {
        return -1;
    }
    else if (a < b) {
        return 1;
    }
    return 0;
}