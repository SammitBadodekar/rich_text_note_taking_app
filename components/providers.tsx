"use client";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>
        <Provider store={store}>{children}</Provider>

    </SessionProvider>;
};
export default Providers;