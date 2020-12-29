const listOfButtonNext = (currentButton, buttonPerPage, totalPage) => {
  let arr = [];
  if ((currentButton - 1) % buttonPerPage === 0) {
    for (let i = currentButton; i < currentButton + buttonPerPage; i++) {
      if (i < totalPage);
      arr.push(i);
    }
  }
  return arr;
};
const listOfButtonPrev = (currentButton, buttonPerPage, totalPage) => {
  console.log(currentButton);
  let arr = [];
  if (currentButton % buttonPerPage === 0) {
    for (let i = currentButton; i > currentButton - 5; i--) {
      arr.push(i);
    }
  }
  return arr.reverse();
};
