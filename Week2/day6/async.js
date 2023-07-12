function prepareIngredients() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isIngredientAvailable = true; // Simulating ingredient availability
  
        if (isIngredientAvailable) {
          console.log("Ingredients are ready!");
          resolve();
        } else {
          reject("Ingredients not available");
        }
      }, 2000);
    });
  }
  
  function cookFood() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Food is cooked!");
        resolve();
      }, 3000);
    });
  }
  
  function serveFood() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Food is served! Enjoy your meal!");
        resolve();
      }, 1000);
    });
  }
  
  function makeFood() {
    console.log("Let's make some food!");
  
    prepareIngredients()
      .then(() => {
        console.log("Ingredients are prepared.");
  
        return cookFood();
      })
      .then(() => {
        console.log("Food is cooked.");
  
        return serveFood();
      })
      .then(() => {
        console.log("Food is served.");
      })
      .catch((error) => {
        console.error("Error during food preparation:", error);
      })
      .finally(() => {
        console.log("Food preparation is complete. Bon appétit!");
      });
  }
  
  // Start the food making process
  makeFood();
  

// function prepareIngredients() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const isIngredientAvailable = true; // Simulating ingredient availability
  
//         if (isIngredientAvailable) {
//           console.log("Ingredients are ready!");
//           resolve();
//         } else {
//           reject("Ingredients not available");
//         }
//       }, 2000);
//     });
//   }
  
//   function cookFood() {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log("Food is cooked!");
//         resolve();
//       }, 3000);
//     });
//   }
  
//   function serveFood() {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log("Food is served! Enjoy your meal!");
//         resolve();
//       }, 1000);
//     });
//   }
  
//   function makeFood() {
//     console.log("Let's make some food!");
  
//     prepareIngredients()
//       .then(() => {
//         console.log("Ingredients are prepared.");
  
//         return Promise.all([cookFood(), serveFood()]);
//       })
//       .then(() => {
//         console.log("Food is cooked and served.");
//       })
//       .catch((error) => {
//         console.error("Error during food preparation:", error);
//       })
//       .finally(() => {
//         console.log("Food preparation is complete. Bon appétit!");
//       });
//   }
  
//   // Start the food making process
//   makeFood();
  


// // // function prepareIngredients() {
// // //     return new Promise((resolve) => {
// // //       setTimeout(() => {
// // //         console.log("Ingredients are ready!");
// // //         resolve();
// // //       }, 2000);
// // //     });
// // //   }
  
// // //   function cookFood() {
// // //     return new Promise((resolve) => {
// // //       setTimeout(() => {
// // //         console.log("Food is cooked!");
// // //         resolve();
// // //       }, 3000);
// // //     });
// // //   }
  
// // //   function serveFood() {
// // //     return new Promise((resolve) => {
// // //       setTimeout(() => {
// // //         console.log("Food is served! Enjoy your meal!");
// // //         resolve();
// // //       }, 1000);
// // //     });
// // //   }
  
// // //   async function makeFood() {
// // //     console.log("Let's make some food!");
  
// // //     await prepareIngredients();
// // //     console.log("Ingredients are prepared.");
  
// // //     await cookFood();
// // //     console.log("Food is cooked.");
  
// // //     await serveFood();
// // //     console.log("Food is ready to be served.");
  
// // //     console.log("Food preparation is complete. Bon appétit!");
// // //   }
  
// // //   // Start the food making process
// // //   makeFood();
  
// //   function prepareIngredients() {
// //     return new Promise((resolve, reject) => {
// //       setTimeout(() => {
// //         const isIngredientAvailable = false; // Simulating ingredient availability
  
// //         if (isIngredientAvailable) {
// //           console.log("Ingredients are ready!");
// //           resolve();
// //         } else {
// //           reject("Ingredients not available");
// //         }
// //       }, 2000);
// //     });
// //   }
  
// //   function cookFood() {
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         console.log("Food is cooked!");
// //         resolve();
// //       }, 3000);
// //     });
// //   }
  
// //   function serveFood() {
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         console.log("Food is served! Enjoy your meal!");
// //         resolve();
// //       }, 1000);
// //     });
// //   }
  
// //   async function makeFood() {
// //     console.log("Let's make some food!");
  
// //     try {
// //       await prepareIngredients();
// //       console.log("Ingredients are prepared.");
  
// //       await Promise.all([cookFood(), serveFood()]);
// //       console.log("Food is cooked and served.");
// //     } catch (error) {
// //       console.error("Error during food preparation:", error);
// //     } finally {
// //       console.log("Food preparation is complete. Bon appétit!");
// //     }
// //   }
  
// //   // Start the food making process
// //   makeFood();
  