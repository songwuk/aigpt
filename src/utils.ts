export class NumUtils {
  static formatWithK(num) {
    const absNum = Math.abs(num) // 取绝对值
    if (absNum >= 1000000) { // 大于等于100万
      return `${(num / 1000000).toFixed(1)}M`
    }
    else if (absNum >= 1000) { // 大于等于1千
      return `${(num / 1000).toFixed(1)}k`
    }
    else {
      return num.toString()
    }
  }
}
