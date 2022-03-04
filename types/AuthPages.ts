import { NextPage } from "next"
import { AppProps } from "next/app"

export type NextPageAuth<P = {}, IP = P> = NextPage<P, IP> & {
    auth?: boolean
}

export type AppPropsWithAuth = AppProps & {
    Component: NextPageAuth
}