import moment from "moment";

export const keyToName = (key) => {
    const splittedKey = key.split(/(?=[A-Z])/);
    const name = splittedKey.map((k) => k.toLowerCase()).join(' ');
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const normalizeChangeObject = (keys, changeObject) =>{
    const words = ['start', 'end'];
	const regEx = new RegExp(words.join('|'));
    return keys.map((key) =>({
        name: `• ${keyToName(key)}`,
		value: regEx.test(key) ? moment(changeObject[key]).format('HH:mm') : changeObject[key],
    }));
};