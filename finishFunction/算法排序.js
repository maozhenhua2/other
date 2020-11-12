// 归并排序
function merge(left, right) {
  let arr = []
  // 如果任何一个数组为空，就退出循环
  while (left.length && right.length) {
    // 从左右子数组的最小元素中选择较小的元素
    if (left[0] < right[0]) {
      arr.push(left.shift())
    } else {
      arr.push(right.shift())
    }
  }

  // 连接剩余的元素，防止没有把两个数组遍历完整
  return [...arr, ...left, ...right]
}

function mergeSort(array) {
  const half = array.length / 2

  if (array.length < 2) {
    return array
  }

  const left = array.splice(0, half)
  return merge(mergeSort(left), mergeSort(array))
}
// 使用例子
// array = [4, 8, 7, 2, 11, 1, 3];
// console.log(mergeSort(array));