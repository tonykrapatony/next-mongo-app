// app/components/MainContainer.jsx
import Navbar from "./Navbar/Navbar";

export default function MainContainer({ children, className, params, searchParams }) {
  return (
    <>
      <Navbar />
      <div className={className}>
        {children}
      </div>
    </>
  )
}
