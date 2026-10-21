// Capitalize the first letter, lowercase the rest
function capitalize(word: string): string {
    if (word.length === 0) return word;
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

// Title case: "hello wORLD foo" -> "Hello World Foo"
function toTitleCase(s: string): string {
    const words = s.split(' ');
    const result: string[] = [];
    for (const word of words) {
        result.push(capitalize(word));
    }
    return result.join(' ');
}

// Camel case: "hello wORLD foo" -> "helloWorldFoo"
// Camel case = first word lower + remaining = title case
function toCamelCase(s: string): string {
    const words = s.split(' ').filter(w => w.length > 0); // ignore extra spaces
    let result = '';
    for (let i = 0; i < words.length; i++) {
        if (i === 0) {
            result += words[i].toLowerCase();   // first word: all lower
        } else {
            result += capitalize(words[i]);     // others: title-case
        }
    }
    return result;                              // joined with no spaces
}

console.log(toTitleCase("hello wORLD foo")); // "Hello World Foo"
console.log(toCamelCase("hello wORLD foo")); // "helloWorldFoo"