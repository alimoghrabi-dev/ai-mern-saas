import app from "./app.js";
import { connectToDB } from "./db/connection.js";
const PORT = process.env.PORT || 3000;
connectToDB()
    .then(() => {
    app.listen(PORT, () => {
        console.log("Server is running & connected to MongoDB");
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map