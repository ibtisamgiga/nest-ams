function extractValue(arr, prop) {
  let extractedValue = arr?.map((item) => item[prop]);
  return extractedValue;
}

export default extractValue;
