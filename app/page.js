import MainContainer from "./components/MainContainer";

export const metadata = {
    title: "Main page",
    description: "Main page description",
    keywords: "NextJS, Main page",
}

export default function Home() {

  return (
    <MainContainer>
      <main className="p-24">
        <h1 className="mt-[50px] text-3xl text-center">Welcome to a simple fullstack application.</h1>
        <p className="text-lg text-center">Here you will be able to view registered users or browse registered users' posts and comments.</p>
        <p className="text-lg text-center">After registration, you will also be able to leave posts and comments on your own posts or those of other users.</p>
        <p className="text-lg text-center text-red-700">The project is designed for educational purposes, so do not leave any confidential information, only fake data.</p>
      </main>
    </MainContainer>
  )
}
