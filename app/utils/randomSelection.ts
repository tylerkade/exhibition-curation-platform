export function getRandomAmount(array: number[], amount: number): number[] {
  if (array.length < amount) {
    throw new Error(`Array must contain at least ${amount} elements`);
  }

  const clonedArray = [...array];

  for (let i = clonedArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
  }
  return clonedArray.slice(0, amount);
}
