// export const isStaffMiddleware = async (req, res, next) => {
//     try {
//         // Get the user ID from the request object
//         const userId = req.user.id;

//         // Find the user in the database
//         const user = await User.findById(userId);

//         // Check if the user is an admin or staff
//         if (user.position === 'admin' || user.position === 'staff') {
//             // User is authorized, proceed to the next middleware or route handler
//             next();
//         } else {
//             // User is not authorized, send a 403 Forbidden response
//             res.status(403).json({ error: 'Access denied' });
//         }
//     } catch (error) {
//         // Handle any errors that occur during the middleware execution
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };
import User from "../models/User.js";
export const checkAdmin = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user || user.Position !== "admin") {
      return res.status(403).json({
        error: "Forbidden: You dont have permission to access this resource",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
