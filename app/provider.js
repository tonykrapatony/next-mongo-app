'use client'
import { SessionProvider } from "next-auth/react"
import { store } from "@/redux";
import { Provider } from "react-redux";

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}
