// 拖動功能
// 作者：浴室熊
// 链接：https://juejin.cn/post/6938439210453958692
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// const e = document.getElementsByClassName("avatar");

const mouseDown = e => {
    let transf = getTransform(oDiv)
    x = e.clientX - transf.transX // 图片初始位置
    y = e.clientY - transf.transY // 图片初始位置
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

const mouseMove = e => {
    let multiple = getTransform(oDiv).multiple
    let moveX = e.clientX - x // x向移动距离
    let moveY = e.clientY - y // y向移动距离
    let newTransf = limitBorder(oDiv, oBox, moveX, moveY, multiple)
    oDiv.style.transform = `matrix(${multiple}, 0, 0, ${multiple}, ${newTransf.transX}, ${newTransf.transY})`
}

const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
}

// const zoom = e => {
//     let transf = getTransform(oDiv)
//     if (e.deltaY < 0) {
//         transf.multiple *= DELTA // 放大DELTA倍
//     } else {
//         transf.multiple /= DELTA // 缩小DELTA倍
//     }
//     let newTransf = limitBorder(oDiv, oBox, transf.transX, transf.transY, transf.multiple)
//     oDiv.style.transform = `matrix(${transf.multiple}, 0, 0, ${transf.multiple}, ${newTransf.transX}, ${newTransf.transY})`
// }

// const limitBorder = (innerDOM, outerDOM, moveX, moveY, multiple) => {
//     let { clientWidth: innerWidth, clientHeight: innerHeight, offsetLeft: innerLeft, offsetTop: innerTop } = innerDOM
//     let { clientWidth: outerWidth, clientHeight: outerHeight } = outerDOM
//     let transX
//     let transY
//     // 放大的图片超出box时 图片最多拖动到与边框对齐
//     if (innerWidth * multiple > outerWidth || innerHeight * multiple > outerHeight) {
//         if (innerWidth * multiple > outerWidth && innerWidth * multiple > outerHeight) {
//             transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
//             transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
//         } else if (innerWidth * multiple > outerWidth && !(innerWidth * multiple > outerHeight)) {
//             transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
//             transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
//         } else if (!(innerWidth * multiple > outerWidth) && innerWidth * multiple > outerHeight) {
//             transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
//             transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
//         }
//     }
//     // 图片小于box大小时 图片不能拖出边框
//     else {
//         transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
//         transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
//     }
//     return { transX, transY }
// }

// const getTransform = DOM => {
//     let arr = getComputedStyle(DOM).transform.split(',')
//     return {
//         transX: isNaN(+arr[arr.length - 2]) ? 0 : +arr[arr.length - 2], // 获取translateX
//         transY: isNaN(+arr[arr.length - 1].split(')')[0]) ? 0 : +arr[arr.length - 1].split(')')[0], // 获取translateX
//         multiple: +arr[3] // 获取图片缩放比例
//     }
// }