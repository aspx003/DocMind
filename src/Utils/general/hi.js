const hiInForeignLanguages = {
  English: "Hello",
  Chinese: "Ni hao",
  Hindi: "Namaste",
  Spanish: "Hola",
  French: "Bonjour",
  Bengali: "Nomoshkar",
  Portuguese: "Ola",
  Russian: "Privyet",
  Indonesian: "Halo",
  German: "Hallo",
  Japanese: "Konnichiwa",
  Swahili: "Jambo",
  Marathi: "Namaskar",
  Telugu: "Namaskaram",
  Turkish: "Merhaba",
  Tamil: "Vanakkam",
  Korean: "Annyeonghaseyo",
  Vietnamese: "Xin chao",
  Italian: "Ciao",
  Hausa: "Sannu",
  Thai: "Sawasdee",
  Gujarati: "Kem cho",
  Polish: "Czesc",
  Persian: "Salam",
};

// function to randomly select a language and return hi and that language in that language
export function sayHi() {
  const languages = Object.keys(hiInForeignLanguages);
  const randomLanguage =
    languages[Math.floor(Math.random() * languages.length)];
  return {
    helloText: hiInForeignLanguages[randomLanguage],
    language: randomLanguage,
  };
}
