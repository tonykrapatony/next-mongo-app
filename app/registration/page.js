import MainContainer from '../components/MainContainer'
import Registration from '../components/Registration';

export const metadata = {
  title: "Registration page",
  description: "Registration page description",
  keywords: "NextJS, Registration page",
}

export default function page() {
   
    return (
        <MainContainer page_title={"Users page"} className="flex flex-col items-center p-24">
            <Registration />
        </MainContainer>
    )
}
