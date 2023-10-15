
import MainContainer from "@/app/components/MainContainer";
import UserPage from "@/app/components/Users/UserPage";

export const metadata = {
    title: "User page",
    description: "User page description",
    keywords: "NextJS, User page",
}

export default function Page({ params }) {
    return (    
        <MainContainer className="flex flex-col items-center p-24">
            <UserPage params={params} />
        </MainContainer>
    );
  }