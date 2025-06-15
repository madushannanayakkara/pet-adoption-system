import UnauthorizedImg from "../assets/unauthorized.svg";

const Unauthorized = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-10">
        Unauthorized Access
      </h1>
      <p className="text-center text-lg mt-4">
        You do not have permission to view this page.
      </p>
      <img
        src={UnauthorizedImg}
        className="mx-auto mt-6 w-1/2 h-auto"
        alt="unauthorized"
      />
      <div className="flex justify-center mt-6">
        <a href="/login" className="text-blue-500 hover:underline">
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
