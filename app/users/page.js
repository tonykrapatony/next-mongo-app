import MainContainer from "../components/MainContainer";
import UsersList from "../components/Users/UsersList";

export const metadata = {
  title: "Users page",
  description: "Users page description",
  keywords: "NextJS, Users page",
}
export default function Users() {
  return (
    <MainContainer className="flex flex-col items-center p-24">
        <h1 className="mb-[50px] text-3xl">Users list</h1>
        <UsersList />
    </MainContainer>
  )
}
