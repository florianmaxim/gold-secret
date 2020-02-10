#!/usr/bin/env node

const [...parameters] = process.argv;

const MODE = parameters[2];
const TEXT = parameters[3];
const KEY  = parameters[4];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

switch (MODE)
{
   case "E":
   case "encrypt":
       console.log(encrypt(TEXT, KEY));
       break;
   case "D":
   case "decrypt":
       console.log(decrypt(TEXT, KEY));
       break;
   default:
       console.log('Keep Your Secrets!');
}

function encrypt(plaintext, keyword) {
  let ciphertext = "";

  let j = 0;
  for (let i = 0; i < plaintext.length; i++) {
    /* Iterate our plaintext- character by character. */

    const inputCharacter =
      plaintext[i]; /* Store our current plaintext character.  */
    const inputCharacterIndex = ALPHABET.indexOf(
      inputCharacter
    ); /* Store it's index in the alphabet.       */

    if (inputCharacterIndex === -1) {
      /* If our current plaintext character is not included in the alphabet  */
      ciphertext += inputCharacter; /* directly add it to our ciphertext. Since we are not encrypting      */
      continue; /* it anyways, we can directly move on with the next character.        */
    }

    const keywordCharacter = keyword[j]; /* Our current keyword character.    */
    const keywordCharacterIndex = ALPHABET.indexOf(
      keywordCharacter
    ); /* It's index in the alphabet.       */

    const indicesSum =
      inputCharacterIndex +
      keywordCharacterIndex; /* We add both indices.         */

    const cipherCharacterIndex =
      indicesSum % 26; /* If it's greater than the length of     */
    /* the alphabet we subtract it's length.  */

    const cipherTextCharacter =
      ALPHABET[
        cipherCharacterIndex
      ]; /* We map the alphabet's letter to this index.*/

    // console.log(`${plaintext[i]}(${inputCharacterIndex}) + ${keyword[j]}(${keywordCharacterIndex}) = ${inputCharacterIndex + keywordCharacterIndex} % 26 = ${cipherCharacterIndex} => ${cipherTextCharacter}`);

    j =
      j === keyword.length - 1
        ? 0
        : j + 1; /* If we reached the keyword's end start again      */
    /* from the beginning by setting it's pointer to 0. */

    ciphertext += cipherTextCharacter; /* Finally add our current ciphertext character to our ciphertext. */
  }

  return ciphertext;
}

function decrypt(ciphertext, key) {
  let plaintext = "";

  let j = 0;

  for (let i = 0; i < ciphertext.length; i++) {
    /* Iterate our ciphertext- character by character. */

    const ciphertextCharacter =
      ciphertext[i]; /* Store our current plaintext character. */
    const ciphertextCharacterIndex = ALPHABET.indexOf(
      ciphertextCharacter
    ); /* Store it's index in the alphabet.      */

    if (ciphertextCharacterIndex === -1) {
      /* If our current ciphertext character is not included in our alphabet */
      plaintext += ciphertextCharacter; /* directly add it to our plaintext without any decryption.            */
      continue; /* Stop here and jump to the next interation.                          */
    }

    const keyCharacter = key[j]; /* Store our current key character.  */
    const keyCharacterIndex = ALPHABET.indexOf(
      keyCharacter
    ); /* Store it's index in the alphabet. */

    const indicesSum =
      ciphertextCharacterIndex -
      keyCharacterIndex +
      26; /* Subtract both indices */
    /* and add the alphabets's length. */

    const cipherCharacterIndex =
      indicesSum % 26; /* If it's greater than the length of     */
    /* the alphabet we subtract it's length.  */

    const cipherCharacter =
      ALPHABET[
        cipherCharacterIndex
      ]; /* We map the alphabet's letter to this index. */

    /*     console.log(
      `${input[i]}(${inputCharacterIndex}), ${key[j]}(${keyCharacterIndex}) =>
${inputCharacterIndex} - ${keyCharacterIndex} + 26 = ${indicesSum}
${indicesSum} % 26 = ${cipherCharacterIndex}
=> ${cipherCharacter}(${cipherCharacterIndex})`
    ); */

    j =
      j === key.length - 1
        ? 0
        : j + 1; /* If we reached the keyword's end start again  */
    /* from the beginning by setting it's pointer to 0. */

    plaintext += cipherCharacter; /* Finally add our current plaintext character to our ciphertext. */
  }

  return plaintext;
}
