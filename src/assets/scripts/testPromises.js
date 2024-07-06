

const test = async (blackEl) => {
  // eslint-disable-next-line
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
  // eslint-disable-next-line
  console.log(blackEl)
  // eslint-disable-next-line
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~')
  await Promise.all([
    (async () => console.log(await test1()))(),
    (async () => console.log(await test2()))(),
  ]);

  test4()
  test3()
  // // 2. Log the results together
  // console.log(results[0]);
  // console.log(results[1]);
}

const test1 = async () => {
  const start = Date.now();
  console.log("starting slow promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      const myArray = Array(1000000000);
      for (let i = 0; i <= myArray.length; i++) {
        if (i === 1000000000 - 1) console.log(i)
      }
      const end = Date.now();
      console.log(`Execution time: ${end - start} ms`);
      resolve("slow");
    });
  });
}

const test4 = async () => {
  const start = Date.now();
  console.log("starting slow 2 promise");
  const myArray = Array(1000000000);
  for (let i = 0; i <= myArray.length; i++) {
    if (i === 1000000000 - 1) console.log(i)
  }
  const end = Date.now();
  console.log(`Execution time slow 2: ${end - start} ms`);
}

const test2 = async () => {
  const start = Date.now();
  console.log("starting fast promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      const myArray = Array(1000000000);
      for (let i = 0; i <= myArray.length; i++) {
        if (i === 1000000000 - 1) console.log(i)
      }
      const end = Date.now();
      console.log(`Execution time2: ${end - start} ms`);
      resolve("fast");
    });
  });
}

const test3 = async () => {
  const start = Date.now();
  console.log("starting fast 2 promise");
  const myArray = Array(1000000000);
  for (let i = 0; i <= myArray.length; i++) {
    if (i === 1000000000 - 1) console.log(i)
  }
  const end = Date.now();
  console.log(`Execution time fast 2: ${end - start} ms`);
}




// function resolveAfter1Second() {
//   console.log("starting fast promise");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("fast");
//       console.log("fast promise is done");
//     }, 1000);
//   });
// }


export default test
