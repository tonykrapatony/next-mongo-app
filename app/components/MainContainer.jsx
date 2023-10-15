// app/components/MainContainer.jsx
import Navbar from "./Navbar/Navbar";

export default function MainContainer({ title, description, keywords, children, className }) {
  return (
    <>
      <Navbar />
      <div className={className}>
        {children}
      </div>
    </>
  )
}
