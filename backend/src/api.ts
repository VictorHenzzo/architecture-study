import express, { Request, Response } from "express";
import SignUp from "./signup";
import GetAccount from "./get_account";

const app = express();
app.use(express.json())
app.post("/signup", async function (req: Request, res: Response) {
    try {
        const signUp = new SignUp()
        const input = req.body;
        const output = await signUp.execute(input);
        res.json(output);
    } catch (error: any) {
        res.status(422).json({ message: error.message });
    }
})

app.get("/account/:accountId", async function (req: Request, res: Response) {
    const getAccount = new GetAccount();
    const accountId = req.params.accountId;
    const output = await getAccount.execute(accountId);
    res.json(output);
})

app.listen(3000, () => {
    console.log(`Server is running on http:localhost:3000`);
});