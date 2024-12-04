import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import * as bcrypt from 'bcrypt';
import { SingUpFormType } from '@/utils/formValidator';
import { authorizeApolloClient } from "@/graphql/appolloClient";

import { CreateAccountDocument, CreateAccountMutation, CreateAccountMutationVariables } from "@/generated/graphql";
const SignUpHandler:NextApiHandler = async (req: NextApiRequest, res: NextApiResponse, ) => {
    const {emailAddress, password }: SingUpFormType = req.body;
    const passwordHash = await bcrypt.hash(password, 12)
    try {
    const user = await authorizeApolloClient.mutate<CreateAccountMutation, CreateAccountMutationVariables>({
        mutation: CreateAccountDocument,
        variables: {
            email: emailAddress,
            password: passwordHash
        }
    })

    if (user.data?.createAccount?.id) {
        return res.status(200).json({ message: 'Konto zostało utworzone pomyślnie!', data: user.data.createAccount.id });
      }
      return res.status(400).json({ message: 'Nie dało się utworzyć konta.', errors: user.errors });
    } catch (error) {
      if (error.networkError) {
        return res.status(500).json({ message: 'Użytkownik o tej nazwie istnieje już w serwisie', details: error.networkError.result.errors });
      }
    }
}

export default SignUpHandler;