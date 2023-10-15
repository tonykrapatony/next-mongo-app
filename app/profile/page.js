import MainContainer from "../components/MainContainer";
import Profile from "../components/Users/Profile";

export const metadata = {
    title: "Profile page",
    description: "Profile page description",
    keywords: "NextJS, Profile page",
}

export default function Page() {
    return (
        <MainContainer className="flex flex-col items-center p-24">
            <Profile />
        </MainContainer>
    )
}
