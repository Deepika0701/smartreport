import { user } from "../../models/users.model.js";
import jwt from "jsonwebtoken";
import { dataparser } from "../../utils/dataparser.js";
export const getTest = async (req,res)=>{
    try{

    
        const token = req.cookies?.token;

        if (!token) return res.status(401).json({ error: 'Access denied' });
    

        const decoded = jwt.verify(token, 'maazansari007');

        const myres = await user.findOne({userId:decoded.userId});
        if(myres===null){
            res.send('no user');
        }else{
            
            
            let data = await dataparser(myres.test_values);

            const cooked = {testId:myres.test_id,testCode:myres.test_code,testName:myres.test_name,testValues:data};
            res.status(200).json(cooked);
        }

    }catch(err){
        res.status(401).send('some error');
    }
}