const {
  verifyHash,
  hashWithCostFactor,
  hashWithSalt,
  hash,
  generateRandomSalt
} = require("./hashing.js");

describe("function: generateRandomSalt", () => {
  it("should generate salt with requested length", () => {
    const saltLength = 16;
    const randomSalt1 = generateRandomSalt(saltLength);
    expect(randomSalt1.length).toEqual(saltLength);
  });

  it("should generate random salts", () => {
    const saltLength = 16;
    const randomSalt1 = generateRandomSalt(saltLength);
    const randomSalt2 = generateRandomSalt(saltLength);
    expect(randomSalt1).not.toEqual(randomSalt2);
  });
});

describe("function: hash", () => {
  it("should generate hash with requested length", () => {
    const data = "hello world";
    const hashedData = hash(data);
    console.log(hashedData.length);
    expect(hashedData.length).toEqual(128);
  });
});
