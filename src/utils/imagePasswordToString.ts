export const imagePasswordToString = (imagePasswordState: boolean[][]) => {
  let binaryArray: (0 | 1)[] = [];

  for (let i = 0; i < imagePasswordState.length; i++) {
    binaryArray = [
      ...binaryArray,
      ...imagePasswordState[i].map((el) => Number(el) as 0 | 1),
    ];
  }

  let hexString = "";

  for (let i = 0; i < binaryArray.length; i += 4) {
    const chunk = binaryArray.slice(i, i + 4);
    const binaryString = chunk.join("");
    const hexValue = parseInt(binaryString, 2).toString(16);
    hexString += hexValue;
  }

  return hexString;
};
