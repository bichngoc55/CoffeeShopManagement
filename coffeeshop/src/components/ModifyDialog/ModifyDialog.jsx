// import React, { useState } from "react";
// const ModifyDialog = ({ onClose, drink }) => {
//   const [drinkDetails, setDrinkDetails] = useState(drink);

//   const handleChange = (event) => {};

//   // const handleSave = async () => {
//   //   try {
//   //     const response = await fetch(/* Your drinks API endpoint */, {
//   //       method: "PUT",
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(drinkDetails),
//   //     });
//   //     if (response.ok) {
//   //       onClose(); // close the modal only if the request is successful
//   //     } else {
//   //       // handle the error case
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     // handle the error case
//   //   }
//   // };

//   return (
//     <dialog open>
//       <form>
//         <label>
//           Drink Name:
//           <input
//             type="text"
//             value={drinkDetails.name}
//             onChange={(e) =>
//               setDrinkDetails({ ...drinkDetails, name: e.target.value })
//             }
//           />
//         </label>

//         <label>
//           Drink Price:
//           <input
//             type="number"
//             value={drinkDetails.price}
//             onChange={(e) =>
//               setDrinkDetails({ ...drinkDetails, price: e.target.value })
//             }
//           />
//         </label>

//         {/* Add other form elements related to other drink details */}

//         <button type="button">Save changes</button>
//         {/* onClick={handleSave} */}
//       </form>
//     </dialog>
//   );
// };

// export default ModifyDialog;
