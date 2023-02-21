import React from "react";
import { claimModel } from "../models/auth.models";

const AuthentitcationContext = React.createContext<{
    claims: claimModel[];
    update(claims: claimModel[]): void
}>({
    claims: [],
    update: () => {}
})

export default AuthentitcationContext;