function verifyStringMath(str) {
  const expressionMath = /^[0-9+\-*/().\s]*$/;

  if (!expressionMath.test(str)) {
    console.error("Biểu thức chứa ký tự không an toàn!");
    return null;
  }

  try {
    return new Function('return ' + str)();
  } catch (err) {
    return 'Lỗi cú pháp toán học';
  }
}

export const testingResult = (arrayMath) => {
    return arrayMath.map(y => verifyStringMath(y.expression) === y.answer)
}