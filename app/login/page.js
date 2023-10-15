import Login from "../components/Login";
import MainContainer from "../components/MainContainer";

export const metadata = {
    title: "Login page",
    description: "Login page description",
    keywords: "NextJS, Login page",
}

export default function Page() {

    return (
        <MainContainer page_title={"Users page"} className="flex flex-col items-center p-24">
            <Login />
        </MainContainer>
    )
}
